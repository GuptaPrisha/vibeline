import { socket } from "../../lib/constants"
import "./Contacts.scss"

import { useEffect, useState } from "react"

export default function Contacts(props) {
	const [contacts, setContacts] = useState([])
	const [activeContactID, setActiveContactID] = useState(null)

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
			setContacts(data.user.contacts)
		})

		//callback is provided for the time of unmounting of function
		return () => {
			socket.off("user")
		}
	}, [props.userID])

	if (!props.show) return null

	return (
		<div className="ContactsComponent modal">
			<div
				className="backdrop"
				onClick={() => {
					props.setShow(false)
				}}
			></div>
			<div className="wrapper">
				<header>
					<div className="title">Contacts Component</div>
					<div className="actions">
						<div
							className="action"
							onClick={() => {
								props.setShowAddContacts(true)
							}}
						>
							<i className="fi fi-rr-plus"></i>
						</div>
					</div>
				</header>
				<div className="content">
					<div className="sidebar">
						<div className="title">Contacts</div>
						<div className="contacts">
							{contacts.map((contact) => {
								return (
									<div
										className={`contact ${
											activeContactID === contact.id ? "active" : ""
										}`}
										key={contact.id}
										onClick={() => {
											setActiveContactID(contact.id)
										}}
									>
										<div className="profile">
											<img src={contact.dp} alt="dp" />
										</div>
										<div className="box">
											<div className="name">{contact.name}</div>
											<div className="username">{contact.username}</div>
										</div>
									</div>
								)
							})}
						</div>
					</div>
					<div className="main">
						<div className="title">Contact info</div>
						{activeContactID}
					</div>
				</div>
			</div>
		</div>
	)
}
