import "./AddContact.scss"

export default function AddContact(props) {
	if (!props.show) return null

	return (
		<div className="AddContactComponent modal">
			<div
				className="backdrop"
				onClick={() => {
					props.setShow(false)
				}}
			></div>
			<div className="wrapper">
				<header>
					<div className="title">Add contact</div>
					<div className="actions">
						<div className="action">
							<i
								className="fi fi-rr-cross"
								onClick={() => {
									props.setShow(false)
								}}
							></i>
						</div>
						<div className="action">
							<i
								className="fi fi-rr-check"
								onClick={() => {
									props.setShow(false)
								}}
							></i>
						</div>
					</div>
				</header>
			</div>
		</div>
	)
}
