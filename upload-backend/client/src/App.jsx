function App() {
	return (
		<div style={{
			display: "flex",
			flexDirection: "column",
			alignItems: "center",
			height: '100vh',
			width: '100vw',
			background: 'teal'
		}}>
			<div style={{ marginBottom: '30px', marginTop: '30px' }}>
				<strong>Streaming Video . . .</strong>
			</div>

			<video autoPlay controls style={{
				width: '50%',
				height: '300px',
				border: '1px solid #063b35'
			}}>
				<source src="http://localhost:3000/video" type="video/mp4" />
				Your browser does not support the video tag
			</video>
		</div>)
}

export default App
