import "./Login.scss"

import { useState } from "react"
import logo from "../../assets/logo.svg"

export default function Login(props) {
	const [name, setName] = useState("My cat")
	const [email, setEmail] = useState("cat@vibeline.com")
	const [username, setUsername] = useState("my_cat")
	const [password, setPassword] = useState("Hello@123")
	const [phone, setPhone] = useState("123456890")

	const [error, setError] = useState("")
	const [isLogin, setIsLogin] = useState(true)

	return (
		<div className="LoginComponent Route">
			<div className="wrapper">
				<div className="logo">
					<img src={logo} alt="Logo" />
				</div>
				<div className="main">
					{!isLogin && (
						<>
							<div className="input">
								<i className="fi fi-rr-text"></i>
								<input
									autoFocus
									type="text"
									value={name}
									onKeyDown={(e) => {
										if (e.key === "Enter")
											document.getElementById("login-button")?.click()
									}}
									placeholder="Name"
									autoComplete="vibeline-email"
									onChange={(e) => setName(e.target.value)}
								/>
							</div>
							<div className="divider"></div>
							<div className="input">
								<i className="fi fi-rr-envelope"></i>
								<input
									autoFocus
									type="text"
									value={email}
									onKeyDown={(e) => {
										if (e.key === "Enter")
											document.getElementById("login-button")?.click()
									}}
									placeholder="Email"
									autoComplete="vibeline-email"
									onChange={(e) => setEmail(e.target.value)}
								/>
							</div>
							<div className="divider"></div>
							<div className="input">
								<i className="fi fi-rr-phone-call"></i>
								<input
									autoFocus
									type="text"
									value={phone}
									onKeyDown={(e) => {
										if (e.key === "Enter")
											document.getElementById("login-button")?.click()
									}}
									placeholder="Phone"
									autoComplete="vibeline-phone"
									onChange={(e) => setPhone(e.target.value)}
								/>
							</div>
							<div className="divider"></div>
						</>
					)}
					<div className="input">
						<i className="fi fi-rr-at"></i>
						<input
							autoFocus
							type="text"
							value={username}
							onKeyDown={(e) => {
								if (e.key === "Enter")
									document.getElementById("login-button")?.click()
							}}
							placeholder="Username"
							autoComplete="vibeline-email"
							onChange={(e) => setUsername(e.target.value)}
						/>
					</div>
					<div className="divider"></div>
					<div className="input">
						<i className="fi fi-rr-key"></i>
						<input
							type="password"
							value={password}
							onKeyDown={(e) => {
								if (e.key === "Enter")
									document.getElementById("login-button")?.click()
							}}
							placeholder="Password"
							autoComplete="vibeline-password"
							onChange={(e) => setPassword(e.target.value)}
						/>
					</div>
					<div className="sub">
						<div className="error">{error}</div>
						<div
							className="forgot"
							onClick={() => {
								setIsLogin(!isLogin)
							}}
						>
							{isLogin ? "Signup" : "Login"}
						</div>
					</div>
					<div
						id="login-button"
						className="button"
						onClick={() => {
							if (isLogin) {
								fetch("https://vibeline-auth.onrender.com/auth/login", {
									method: "POST",
									headers: {
										"content-type": "application/json",
									},
									body: JSON.stringify({
										username: username,
										password: password,
									}),
								}).then(async (res) => {
									const body = await res.json()
									if (res.status !== 200) {
										setError(body.message)
									} else {
										setError("")
										props.setUserID(body.user._id)

										localStorage.setItem("token", body.token)
										localStorage.setItem("userID", body.user._id)
									}
								})
							} else {
								fetch("https://vibeline-auth.onrender.com/auth/signup", {
									method: "POST",
									headers: {
										"content-type": "application/json",
									},
									body: JSON.stringify({
										name: name,
										email: email,
										username: username,
										password: password,
									}),
								}).then(async (res) => {
									const body = await res.json()
									if (res.status !== 200) {
										setError(body.message)
									} else {
										setError("")
										props.setUserID(body.user._id)

										localStorage.setItem("token", body.token)
										localStorage.setItem("userID", body.user._id)
									}
								})
							}
						}}
					>
						{isLogin ? "Login" : "Signup"}
					</div>
				</div>
			</div>
		</div>
	)
}
