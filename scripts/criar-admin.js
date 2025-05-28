// Script simplificado para criar usuário administrador
const { initializeApp } = require('firebase/app');
const { getAuth, createUserWithEmailAndPassword, updateProfile } = require('firebase/auth');
const { getFirestore, doc, setDoc } = require('firebase/firestore');

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

async function criarAdministrador() {
  try {
    console.log("Iniciando criação do administrador...");
    
    // Criar o usuário no Firebase Auth
    console.log(`Criando usuário com email: ${admin.email}`);
    const userCredential = await createUserWithEmailAndPassword(auth, admin.email, admin.senha);
    const user = userCredential.user;
    
    console.log(`Usuário criado com ID: ${user.uid}`);
    
    // Atualizar o perfil do usuário
    console.log("Atualizando perfil do usuário...");
    await updateProfile(user, { displayName: admin.nome });
    
    // Adicionar registro no Firestore - coleção users
    console.log("Criando documento do usuário no Firestore...");
    await setDoc(doc(db, 'users', user.uid), {
      uid: user.uid,
      email: admin.email,
      displayName: admin.nome,
      createdAt: new Date(),
      lastLogin: new Date()
    });
    
    // Adicionar registro no Firestore - coleção admin_users
    console.log("Adicionando usuário como administrador...");
    await setDoc(doc(db, 'admin_users', user.uid), {
      email: admin.email,
      role: 'admin',
      createdAt: new Date()
    });
    
    console.log("==========================================");
    console.log("✅ USUÁRIO ADMINISTRADOR CRIADO COM SUCESSO!");
    console.log("==========================================");
    console.log(`Nome: ${admin.nome}`);
    console.log(`Email: ${admin.email}`);
    console.log(`Senha: ${admin.senha}`);
    console.log(`ID: ${user.uid}`);
    console.log("==========================================");
    
  } catch (error) {
    console.error("❌ ERRO AO CRIAR ADMINISTRADOR:");
    console.error(`Código do erro: ${error.code}`);
    console.error(`Mensagem: ${error.message}`);
    
    if (error.code === 'auth/email-already-in-use') {
      console.log("O email já está sendo usado. Você pode tentar fazer login com estas credenciais.");
    }
  }
}

// Executar
criarAdministrador()
  .then(() => console.log("Processo finalizado."))
  .catch(err => console.error("Erro fatal:", err));
