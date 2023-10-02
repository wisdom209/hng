console.log("I have been injected")

var recorder = null;
let chunks = []
let mediaRecorder;
let key;

function onAccessApproved(stream) {
	key = `${Date.now()}-${Math.floor(Math.random() * 1000000000000)}`
	recorder = new MediaRecorder(stream)

	recorder.start(120000)

	recorder.onstop = () => {
		stream.getTracks().forEach((track) => {
			if (track.readyState == 'live') {
				track.stop()
			}
		})
	}

	recorder.ondataavailable = async (e) => {
		const local = `http://localhost:3000/upload2/${key}`
		const remote = `https://hngvideostreamer.onrender.com/upload2/${key}`

		const response = await fetch(remote, {
			body: e.data,
			method: 'POST',
			headers: { 'Content-Type': 'application/octet-stream' }
		})
		console.log(response)
	}
}

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
	if (message.action == "request_recording") {
		console.log("requesting recording")

		sendResponse(`processed ${message.action}`)

		let audioTrack;

		navigator.mediaDevices.getDisplayMedia({
			audio: true,
			video: {
				width: { ideal: 1280 },
				height: { ideal: 720 }
			}
		}).then(async (stream) => {
			const audioStream = await navigator.mediaDevices.getUserMedia({ audio: true });
			[audioTrack] = audioStream.getAudioTracks()
			stream.addTrack(audioTrack)
			onAccessApproved(stream)
		})
	}
})

chrome.runtime.onMessage.addListener(async (message, sender, sendResponse) => {
	if (message.action == "stop_recording") {
		console.log("stopping recording")
		recorder.stop()

		recording_stopped = true
		sendResponse("processed stop recording")
	}
})
