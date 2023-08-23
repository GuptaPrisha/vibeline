import "./Chats.scss"

import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { socket } from "../../lib/constants"

/// a, b, c -> client emit (socket.emit), serven listen (socket.on)
/// d, e, f -> server emit (socket.emit), client listen (socket.on)

export default function Chats(props) {
	//chat navigation
	const navigate = useNavigate()
	const [chats, setChats] = useState([])
	const [filteredChats, setFiteredChats] = useState([])
	const [searchQuery, setSearchQuery] = useState("")

	useEffect(() => {
		if (!searchQuery.trim()) return setFiteredChats(chats)

		const filtered = chats.filter((chat) => {
			return (
				chat.participants[0].name
					.toLowerCase()
					.includes(searchQuery.trim().toLowerCase()) ||
				chat.participants[0].email
					.toLowerCase()
					.includes(searchQuery.trim().toLowerCase()) ||
				chat.participants[0]?.mobileNo
					?.toString()
					.toLowerCase()
					.includes(searchQuery.trim().toLowerCase()) ||
				chat.participants[0].username
					.toLowerCase()
					.includes(searchQuery.trim().toLowerCase())
			)
		})
		setFiteredChats(filtered)
	}, [chats, searchQuery])

	//user info is need here only and userid is already global
	const [user, setUser] = useState(null)

	useEffect(() => {
		//this will chnage on change of userid first->off then on to avoide duplicate listners
		socket.off("user")
		socket.emit("sendUser", { token: localStorage.getItem("token") })
		socket.on("user", (data) => {
			if (data.status !== 200) {
				localStorage.clear()
				props.setUserID(null)
				return
			}
			const user = data.user
			setUser(user)
		})

		//callback is provided for the time of unmounting of function
		return () => {
			socket.off("user")
		}
	}, [props.userID])

	useEffect(() => {
		socket.on("chatCreated", () => {
			socket.emit("sendChats", { userID: props.userID })
		})

		return () => {
			socket.off("chatCreated")
		}
	}, [])

	useEffect(() => {
		socket.emit("sendChats", { userID: props.userID })
		socket.on("chats", (data) => {
			setChats(data)
		})
		//for unmount use callback
		return () => {
			socket.off("chats")
		}
	}, [])

	if (!user) return null

	return (
		<div className="ChatsComponent">
			<div className="header">
				<div
					className="dp"
					onClick={() => {
						props.setUserID(null)
						localStorage.clear()
					}}
				>
					<img src={user.dp} alt="" />
				</div>
				<div className="search">
					<input
						type="text"
						placeholder="Search"
						value={searchQuery}
						onChange={(e) => setSearchQuery(e.target.value)}
					/>
					<div
						className="action"
						onClick={() => {
							props.setShowContacts(true)
						}}
					>
						<i className="fi fi-rr-users"></i>
					</div>
					<div
						className="action"
						onClick={() => {
							const username = prompt("enter username", "someone")?.trim()
							if (!username) return

							socket.emit("newChat", {
								userID: props.userID,
								username: username,
							})
						}}
					>
						<i className="fi fi-rr-edit"></i>
					</div>
				</div>
			</div>
			<div className="chats">
				{!filteredChats.length ? (
					<p>connect to people to start chatting</p>
				) : (
					filteredChats.map((chat) => {
						return (
							<div
								className={`chatCard ${props.id === chat.id ? "active" : ""}`}
								key={chat.id}
								onClick={() => {
									navigate("/" + chat.id)
								}}
							>
								<div className="profile">
									<img src={chat.participants[0].dp} alt="dp" />
								</div>
								<div className="box">
									<div className="name">{chat.participants[0].name}</div>
									<div className="username">
										{chat.participants[0].username}
									</div>
								</div>
							</div>
						)
					})
				)}
			</div>
		</div>
	)
}
