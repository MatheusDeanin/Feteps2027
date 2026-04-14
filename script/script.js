import { db, collection, addDoc } from "./firebase.js";

async function testeFirebase() {
    try {
        const docRef = await addDoc(collection(db, "teste"), {
            nome: "Lucas",
            valor: 123
        });
        console.log("🔥 Salvou! ID:", docRef.id);
    } catch (e) {
        console.error("❌ Erro real:", e);
    }
}

testeFirebase();