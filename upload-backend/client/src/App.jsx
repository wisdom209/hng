function App() {
	return (
		<div style={{
			display: "flex",
			flexDirection: "column",
			justifyContent: "center",
			alignItems: "center"
		}}>
			<div style={{ marginBottom: '30px', marginTop: '30px' }}>
				<strong>Streaming Video . . .</strong>
			</div>

			<video controls autoPlay style={{ width: '50%', height: '300px' }}>
				<source src="http://localhost:3000/video" type="video/mp4" />
				Your browser does not support the video tag
			</video>
		</div>)
}

export default App
