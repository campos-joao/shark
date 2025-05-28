// Script para diagnosticar e corrigir problemas de criação do administrador
const { initializeApp } = require('firebase/app');
const { 
  getAuth, 
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile
} = require('firebase/auth');
const { 
  getFirestore, 
  doc, 
  setDoc,
  getDoc 
} = require('firebase/firestore');

// Configuração do Firebase
const firebaseConfig = {
  apiKey: "AIzaSyAxlQmLv0FcoCYrbdmAV3U1zhMib7vFMUQ",
  authDomain: "sharkinformatica-c0c00.firebaseapp.com",
  projectId: "sharkinformatica-c0c00",
  storageBucket: "sharkinformatica-c0c00.firebasestorage.app",
  messagingSenderId: "999696462961",
  appId: "1:999696462961:web:b4f7c28dc691533da057d0",
  measurementId: "G-2263TLMCVW"
};

// Inicializar Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

// Dados do administrador
const admin = {
  nome: "admin",
  email: "admin@admin.com",
  senha: "admin123"
};

// Funções auxiliares
async function verificarSeEmailExiste() {
  try {
    console.log(`Verificando se o email ${admin.email} já está cadastrado...`);
    
    try {
      // Tenta fazer login para ver se o usuário já existe
      await signInWithEmailAndPassword(auth, admin.email, admin.senha);
      console.log("✅ Usuário já existe! Vamos atualizar as informações no Firestore.");
      
      // Obter o usuário atual
      const user = auth.currentUser;
      if (!user) {
        throw new Error("Usuário autenticado não encontrado");
      }
      
      return { existe: true, user };
    } catch (loginError) {
      if (loginError.code === 'auth/user-not-found') {
        console.log("❌ Usuário não existe. Vamos criá-lo.");
        return { existe: false };
      } else if (loginError.code === 'auth/wrong-password') {
        console.log("⚠️ Email já existe, mas senha incorreta.");
        throw new Error("Email já cadastrado com outra senha");
      } else {
        console.error(`Erro ao verificar login: ${loginError.code}`);
        throw loginError;
      }
    }
  } catch (error) {
    console.error("Erro ao verificar email:", error);
    throw error;
  }
}

async function criarNovoUsuario() {
  try {
    console.log("Criando novo usuário no Firebase Authentication...");
    const userCredential = await createUserWithEmailAndPassword(auth, admin.email, admin.senha);
    console.log(`✅ Usuário criado com sucesso! ID: ${userCredential.user.uid}`);
    
    // Atualizar perfil com nome de exibição
    await updateProfile(userCredential.user, { displayName: admin.nome });
    console.log("✅ Perfil atualizado com nome de exibição.");
    
    return userCredential.user;
  } catch (error) {
    console.error(`Erro ao criar usuário: ${error.code} - ${error.message}`);
    
    if (error.code === 'auth/email-already-in-use') {
      console.log("⚠️ Este email já está em uso. Tentando recuperar o usuário...");
      
      try {
        // Tentar fazer login para obter o usuário
        const userCredential = await signInWithEmailAndPassword(auth, admin.email, admin.senha);
        console.log("✅ Login realizado com sucesso!");
        return userCredential.user;
      } catch (loginError) {
        console.error("Não foi possível recuperar usuário existente:", loginError);
        throw new Error("Email já cadastrado e não foi possível acessar a conta");
      }
    }
    
    throw error;
  }
}

async function atualizarOuCriarDocumentoUsuario(user) {
  try {
    // Verificar se já existe um documento para este usuário
    const docRef = doc(db, 'users', user.uid);
    const docSnap = await getDoc(docRef);
    
    const userData = {
      uid: user.uid,
      email: user.email,
      displayName: admin.nome,
      updatedAt: new Date()
    };
    
    if (docSnap.exists()) {
      console.log("Documento do usuário já existe. Atualizando...");
      await setDoc(docRef, { ...docSnap.data(), ...userData }, { merge: true });
    } else {
      console.log("Criando novo documento de usuário no Firestore...");
      await setDoc(docRef, {
        ...userData,
        createdAt: new Date(),
        lastLogin: new Date()
      });
    }
    
    console.log("✅ Documento do usuário atualizado/criado no Firestore");
  } catch (error) {
    console.error("Erro ao atualizar documento do usuário:", error);
    throw error;
  }
}

async function configurarComoAdmin(user) {
  try {
    console.log("Configurando usuário como administrador...");
    const adminDocRef = doc(db, 'admin_users', user.uid);
    const adminDocSnap = await getDoc(adminDocRef);
    
    if (adminDocSnap.exists()) {
      console.log("Usuário já é administrador. Atualizando informações...");
      await setDoc(adminDocRef, { 
        email: user.email,
        role: 'admin',
        updatedAt: new Date() 
      }, { merge: true });
    } else {
      console.log("Adicionando usuário à coleção de administradores...");
      await setDoc(adminDocRef, {
        email: user.email,
        role: 'admin',
        createdAt: new Date()
      });
    }
    
    console.log("✅ Usuário configurado como administrador com sucesso!");
  } catch (error) {
    console.error("Erro ao configurar usuário como administrador:", error);
    throw error;
  }
}

async function verificarConfiguracao() {
  try {
    console.log("======= DIAGNÓSTICO DO FIREBASE =======");
    console.log("Verificando configuração do Firebase...");
    console.log(`apiKey: ${firebaseConfig.apiKey ? "✓ Configurada" : "✗ Ausente"}`);
    console.log(`authDomain: ${firebaseConfig.authDomain ? "✓ Configurado" : "✗ Ausente"}`);
    console.log(`projectId: ${firebaseConfig.projectId ? "✓ Configurado" : "✗ Ausente"}`);
    
    console.log("Verificando conexão com serviços do Firebase...");
    console.log(`Auth: ${auth ? "✓ Inicializado" : "✗ Não inicializado"}`);
    console.log(`Firestore: ${db ? "✓ Inicializado" : "✗ Não inicializado"}`);
    
    console.log("========================================");
  } catch (error) {
    console.error("Erro ao verificar configuração:", error);
  }
}

async function principal() {
  console.log("🔍 INICIANDO DIAGNÓSTICO E CRIAÇÃO DE ADMINISTRADOR");
  console.log("========================================");
  
  try {
    // 1. Verificar configuração
    await verificarConfiguracao();
    
    // 2. Verificar se o email já existe
    const { existe, user: existingUser } = await verificarSeEmailExiste();
    
    // 3. Criar usuário ou usar existente
    const user = existe ? existingUser : await criarNovoUsuario();
    
    // 4. Atualizar/Criar documento no Firestore
    await atualizarOuCriarDocumentoUsuario(user);
    
    // 5. Configurar como administrador
    await configurarComoAdmin(user);
    
    console.log("========================================");
    console.log("✅ USUÁRIO ADMINISTRADOR CONFIGURADO COM SUCESSO!");
    console.log("========================================");
    console.log(`📝 CREDENCIAIS DE ACESSO:`);
    console.log(`Nome: ${admin.nome}`);
    console.log(`Email: ${admin.email}`);
    console.log(`Senha: ${admin.senha}`);
    console.log(`ID: ${user.uid}`);
    console.log("========================================");
    console.log("Você já pode fazer login em http://localhost:3000/admin/login");
    
  } catch (error) {
    console.error("❌ ERRO NO PROCESSO:", error);
    console.log("========================================");
    console.log("VERIFICAÇÃO MANUAL NECESSÁRIA:");
    console.log("1. Verifique se o Firebase Authentication está habilitado no console do Firebase");
    console.log("2. Verifique se o endereço de email não está sendo usado em outra conta");
    console.log("3. Verifique as regras de segurança do Firestore no console do Firebase");
    console.log("========================================");
  }
}

// Executar processo
principal()
  .then(() => {
    console.log("Script finalizado.");
    process.exit(0);
  })
  .catch((err) => {
    console.error("Erro fatal:", err);
    process.exit(1);
  });
