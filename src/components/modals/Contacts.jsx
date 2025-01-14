import { socket } from "../../lib/constants"
import "./Contacts.scss"

import { useEffect, useState } from "react"

export default function Contacts(props) {
	const [searchQuery, setSearchQuery] = useState("")
	const [contacts, setContacts] = useState([])
	const [filteredContacts, setFilteredContacts] = useState([])

	const [activeContact, setActiveContact] = useState(null)

	useEffect(() => {
		if (!searchQuery.trim()) return setFilteredContacts(contacts)

		const filtered = contacts.filter((contact) => {
			return (
				contact.name.toLowerCase().includes(searchQuery.trim().toLowerCase()) ||
				contact.email
					.toLowerCase()
					.includes(searchQuery.trim().toLowerCase()) ||
				contact?.mobileNo
					?.toString()
					.toLowerCase()
					.includes(searchQuery.trim().toLowerCase()) ||
				contact.username
					.toLowerCase()
					.includes(searchQuery.trim().toLowerCase())
			)
		})
		setFilteredContacts(filtered)
	}, [contacts, searchQuery])

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
	}, [props.show])

	if (!props.show) return null

	return (
		<div className="ContactsComponent modal">
			<div
				className="backdrop"
				onClick={() => {
					setActiveContact(null)
					props.setShow(false)
				}}
			></div>
			<div className="wrapper">
				<header>
					<div className="title">Contacts</div>
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
						<div className="header">
							<div className="search">
								<input
									autoFocus
									type="text"
									placeholder="Search contacts"
									value={searchQuery}
									onChange={(e) => {
										setSearchQuery(e.target.value)
									}}
								/>
							</div>
						</div>
						<div className="contacts">
							{filteredContacts.map((contact) => {
								return (
									<div
										className={`contact ${
											activeContact?._id === contact._id ? "active" : ""
										}`}
										key={contact._id}
										onClick={() => {
											setActiveContact(contact)
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
						{!activeContact && (
							<div className="no-contact">
								<span>Select a contact to view info</span>
							</div>
						)}
						{activeContact && (
							<div className="contact">
								<div className="profile">
									<img src={activeContact.dp} alt="dp" />
								</div>
								<div className="info">
									<div className="name">{activeContact.name}</div>
									<div className="username">@{activeContact.username}</div>

									<div className="actions">
										<div
											className="action"
											onClick={() => {
												window.open(`tel:${activeContact.mobileNo}`)
											}}
										>
											<i className="fi fi-rr-phone-call"></i>
											<span>Call</span>
										</div>
										<div
											className="action"
											onClick={() => {
												window.open(`mailto:${activeContact.email}`)
											}}
										>
											<i className="fi fi-rr-envelope"></i>
											<span>Email</span>
										</div>
										<div
											className="action"
											onClick={() => {
												socket.emit("newChat", {
													userID: props.userID,
													username: activeContact.username,
												})
												setActiveContact(null)
												props.setShow(false)
											}}
										>
											<i className="fi fi-rr-paper-plane"></i>
											<span>Message</span>
										</div>
									</div>
								</div>
							</div>
						)}
					</div>
				</div>
			</div>
		</div>
	)
}
