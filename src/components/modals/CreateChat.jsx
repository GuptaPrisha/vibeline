import "./CreateChat.scss"

import { useState } from "react"
import { socket } from "../../lib/constants"

export default function CreateChat(props) {
	if (!props.show) return null

	const [username, setUsername] = useState("")

	return (
		<div className="CreateChatComponent modal">
			<div
				className="backdrop"
				onClick={() => {
					props.setShow(false)
				}}
			></div>
			<div className="wrapper">
				<header>
					<div className="title">Create chat</div>
					<div className="actions">
						<div
							className="action"
							onClick={() => {
								props.setShow(false)
							}}
						>
							<i className="fi fi-rr-cross"></i>
						</div>
						<div
							className="action"
							id="add-contact-btn"
							onClick={() => {
								if (!username.trim()) return

								socket.emit("newChat", {
									userID: props.userID,
									username: username.trim(),
								})

								setUsername("")
								props.setShow(false)
							}}
						>
							<i className="fi fi-rr-check"></i>
						</div>
					</div>
				</header>
				<div className="content">
					<div className="hint">Enter the username of the person</div>
					<div className="input">
						<i className="fi fi-rr-user"></i>
						<input
							autoFocus
							type="text"
							placeholder="Username"
							value={username}
							onChange={(e) => setUsername(e.target.value)}
							onKeyDown={(e) => {
								if (e.key === "Enter") {
									document.getElementById("add-contact-btn")?.click()
								}
							}}
						/>
					</div>
				</div>
			</div>
		</div>
	)
}
