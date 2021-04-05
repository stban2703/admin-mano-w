let userInfo;
let userMessagesRef;
let targetId = "BOdgSHsEz8W27vqE201rsCyJfWM2"

firebase.auth().onAuthStateChanged((user) => {
    if (user) {
        const uid = user.uid;
        adminsRef.doc(uid).get().then(function (doc) {
            if (doc.exists) {
                const data = doc.data();
                userInfo = data;
                userInfo.uid = uid;
                userMessagesRef = userRef.doc(targetId).collection('messages');
                handleHeader();
                if (document.querySelector(".chatbot")) {
                    getMessages(isChatOnline);
                }
            }
        })
    } else {
        console.log("Not logged")
    }
});

handleLogOut();

function handleLogOut() {
    const logOutBtn = document.querySelector(".logOutBtn");

    if (logOutBtn) {
        logOutBtn.addEventListener("click", function (event) {
            event.preventDefault();
            firebase.auth().signOut();
            window.location.href = "index.html"
        })
    }
}