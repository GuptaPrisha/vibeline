import "./App.scss"

import { useEffect, useState } from "react"
import { BrowserRouter, Route, Routes } from "react-router-dom"
import Chats from "./components/common/Chats"
import AddContact from "./components/modals/AddContact"
import Contacts from "./components/modals/Contacts"
import CreateChat from "./components/modals/CreateChat"
import Chat from "./components/routes/Chat"
import Login from "./components/routes/Login"
import NoChat from "./components/routes/NoChat"
import { socket } from "./lib/constants"

function App() {
	const [chatID, setChatID] = useState(null)
	const [userID, setUserID] = useState(localStorage.getItem("userID"))
	const [contactsModal, setShowContactsModal] = useState(false)
	const [showAddContactsModal, setShowAddContactsModal] = useState(false)
	const [createChatModal, setCreateChatModal] = useState(false)

	useEffect(() => {
		if (!userID) return
		socket.emit("join", { userID: userID })
	}, [userID])
	//security layer type:1
	if (!userID) return <Login setUserID={setUserID} />

	return (
		//react routing
		<BrowserRouter>
			<div id="app">
				<Contacts
					show={contactsModal}
					setShow={setShowContactsModal}
					setShowAddContacts={setShowAddContactsModal}
					userID={userID}
					setUserID={setUserID}
				/>
				<AddContact
					userID={userID}
					show={showAddContactsModal}
					setShow={setShowAddContactsModal}
				/>
				<CreateChat
					userID={userID}
					show={createChatModal}
					setShow={setCreateChatModal}
				/>
				{/* chats will never change on routing that is why it is outside the routes */}
				<Chats
					id={chatID}
					userID={userID}
					setUserID={setUserID}
					setShowContacts={setShowContactsModal}
					setShowCreateChat={setCreateChatModal}
				/>
				<Routes>
					<Route path="/" element={<NoChat />} />
					<Route
						path="/:id"
						element={
							<Chat setId={setChatID} userID={userID} setUserID={setUserID} />
						}
					/>
				</Routes>
			</div>
		</BrowserRouter>
	)
}

export default App
