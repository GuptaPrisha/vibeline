import "./Chat.scss"

import { nanoid } from "nanoid"
import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import Background from "../../assets/pic.png"
import { socket } from "../../lib/constants"

function timestamp2String(ts) {
	const date = new Date(ts)
	return `${date.getHours()}:${
		date.getMinutes() > 9 ? date.getMinutes() : "0" + date.getMinutes()
	}`
}

// props: { userID: string, setId: Function }
export default function Chat(props) {
	const id = useParams().id
	const navigate = useNavigate()

	const [currentMessage, setCurrentMessage] = useState("")
	// anything that changes after first render, will be a state only rather than a plain variable
	const [chat, setChat] = useState(null)

	useEffect(() => {
		props.setId(id)

		socket.off("chat")
		socket.emit("getChat", { chatID: id, userID: props.userID })
		socket.on("chat", (chat) => {
			setChat(chat)
		})

		return () => {
			socket.off("chat")
		}
	}, [id])

	const [messages, setMessages] = useState([])

	// fetch out the chat history
	useEffect(() => {
		fetch("https://vibeline-auth.onrender.com/chatMessages", {
			method: "POST",
			headers: {
				"content-type": "application/json",
			},
			body: JSON.stringify({
				id: id,
			}),
		}).then(async (res) => {
			if (res.status !== 200) return
			const data = await res.json()
			setMessages(data.messages)
		})
	}, [id])

	// listen for the upcoming messages
	useEffect(() => {
		// we off the componet first on the rerendering then it will b mounted again
		socket.off("recvMessage")
		socket.on("recvMessage", (data) => {
			setMessages([...messages, data])
		})

		return () => {
			socket.off("recvMessage")
		}
	}, [messages])

	if (!chat) return null

	return (
		<div className="ChatComponent">
			<img src={Background} className="chat-background" />
			<div className="background"></div>

			<div className="chat">
				<div className="header">
					<div className="dp">
						<img src={chat.participants[0].dp} alt="" />
					</div>
					<div className="info">
						<div className="name">{chat.participants[0].name}</div>
						<div className="status">@{chat.participants[0].username}</div>{" "}
					</div>
					{chat.participants[0].mobileNo ? (
						<div
							className="action"
							onClick={() => {
								window.open("tel:" + chat.participants[0].mobileNo)
							}}
						>
							<i className="fi fi-rr-phone-call"></i>
						</div>
					) : (
						<div></div>
					)}
					<div
						className="action"
						onClick={() => {
							socket.emit("deleteChat", { chatID: chat.id })
							navigate("/")
						}}
					>
						<i className="fi fi-rr-trash"></i>
					</div>
					<div
						className="action"
						onClick={() => {
							setMessages([])
							fetch("https://vibeline-auth.onrender.com/deleteMessages", {
								method: "POST",
								headers: {
									"content-type": "application/json",
								},
								body: JSON.stringify({
									chatID: chat.id,
								}),
							}).then(async (res) => {
								if (res.status !== 200) return
							})
						}}
					>
						<i className="fi fi-rr-time-delete"></i>
					</div>
				</div>
				<div className="messages-area">
					{messages.map((message) => {
						return (
							<div
								key={message.id}
								className={`message ${
									message.recieverID === props.userID ? "left" : "right"
								}`}
							>
								{/* <div className="tagged-message"></div> */}
								<div className="wrapper">
									<div className="content">{message.text}</div>
									<div className="time">
										{timestamp2String(message.dateCreated)}
									</div>
								</div>
							</div>
						)
					})}
				</div>
				<div className="footer">
					<div className="wrapper">
						{/* <div className="action">
							<i className="fi fi-rr-clip"></i>
						</div> */}
						<div className="input">
							<input
								autoFocus
								type="text"
								placeholder="Type a message"
								value={currentMessage}
								onChange={(e) => {
									setCurrentMessage(e.target.value)
								}}
								onKeyDown={(e) => {
									if (e.key === "Enter") {
										document.getElementById("send-btn").click()
									}
								}}
							/>
						</div>
						{/* <div className="action">
							<i className="fi fi-rr-grin-alt"></i>
						</div> */}
						<div
							id="send-btn"
							className="action"
							onClick={() => {
								const msg = {
									id: nanoid(15),
									text: currentMessage,
									chatID: id,
									senderID: props.userID,
									recieverID: chat.participants[0]._id,
									dateCreated: Date.now(),
								}
								socket.emit("sendMessage", msg)
								setMessages([...messages, msg])
								setCurrentMessage("")
							}}
						>
							<i className="fi fi-rr-paper-plane"></i>
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}
