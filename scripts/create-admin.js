// Script para criar um usuário administrador manualmente
const { initializeApp } = require('firebase/app');
const { 
  getAuth, 
  createUserWithEmailAndPassword,
  updateProfile 
} = require('firebase/auth');
const { 
  getFirestore, 
  doc, 
  setDoc 
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

// Credenciais do administrador
const adminCredentials = {
  displayName: "admin",
  email: "admin@admin.com",
  password: "admin123"
};

// Inicializar o Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

// Função para criar o usuário administrador
async function createAdminUser() {
  try {
    console.log(`Criando usuário administrador: ${adminCredentials.email}`);
    
    // 1. Criar usuário no Firebase Auth
    const userCredential = await createUserWithEmailAndPassword(
      auth, 
      adminCredentials.email, 
      adminCredentials.password
    );
    
    const user = userCredential.user;
    console.log(`Usuário criado com ID: ${user.uid}`);
    
    // 2. Atualizar o perfil do usuário
    await updateProfile(user, { 
      displayName: adminCredentials.displayName 
    });
    console.log(`Perfil atualizado com nome: ${adminCredentials.displayName}`);
    
    // 3. Criar documento do usuário no Firestore
    await setDoc(doc(db, 'users', user.uid), {
      uid: user.uid,
      email: adminCredentials.email,
      displayName: adminCredentials.displayName,
      createdAt: new Date(),
      lastLogin: new Date()
    });
    console.log(`Documento do usuário criado no Firestore`);
    
    // 4. Adicionar usuário como administrador
    await setDoc(doc(db, 'admin_users', user.uid), {
      email: adminCredentials.email,
      role: 'admin',
      createdAt: new Date()
    });
    console.log(`Usuário adicionado como administrador`);
    
    console.log('---------------------------------------------');
    console.log('✅ USUÁRIO ADMINISTRADOR CRIADO COM SUCESSO!');
    console.log('---------------------------------------------');
    console.log(`Nome: ${adminCredentials.displayName}`);
    console.log(`Email: ${adminCredentials.email}`);
    console.log(`Senha: ${adminCredentials.password}`);
    console.log(`ID: ${user.uid}`);
    console.log('---------------------------------------------');
    console.log('Você já pode fazer login no painel de administração!');
    
  } catch (error) {
    console.error('❌ Erro ao criar usuário administrador:', error);
    
    // Verificar erros específicos
    if (error.code === 'auth/email-already-in-use') {
      console.log('📣 Este email já está em uso. Tente fazer login com estas credenciais.');
    } else if (error.code === 'auth/weak-password') {
      console.log('📣 A senha é muito fraca. Use uma senha mais forte.');
    } else if (error.code === 'auth/invalid-email') {
      console.log('📣 O email fornecido é inválido.');
    }
  }
}

// Executar a função principal
createAdminUser()
  .then(() => console.log('Script finalizado.'))
  .catch(error => console.error('Erro ao executar o script:', error));
