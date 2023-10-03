# API DOCUMENTATION

## Endpoint

- To upload a video, blobs of a video with a unique id are posted to https://hngvideostreamer.onrender.com/upload2/<unique id of video> with a specific content type of application/octet stream in the header

Example of a post request with a video blob:

- The post request if successful returns a public url https://hngvideostreamer.onrender.com/stream2/<unique id of video> where the uploaded videos can be seen
```
const response = await fetch(`http://localhost:3000/upload2/${key}`, {
            body: e.data,
            method: 'POST',
            headers: { 'Content-Type': 'application/octet-stream' }
        })
console.log(response)
```
- A public url of the video can be found at https://hngvideostreamer.onrender.com/stream2/<unique id of video> which is returned as a response when the video is successfully uploaded

- A post request to this url https://hngvideostreamer.onrender.com/transcribe/<unique id of video> will return the transcription of the video if at all the video exist in the filesystem
```
		const local = `http://localhost:3000/transcribe/${key}`
		const remote = `https://hngvideostreamer.onrender.com/transcribe/${key}`
		let results = "transcribing"
		const response = fetch(remote, {
			method: 'GET',
			headers: { 'Content-Type': 'application/json' }
		})
			.then((response) => {
				
				console.log(typeof response.body, response.body, response.headers)
				response.json().then(d => {
					results = d.results.channels[0].alternatives[0].transcript;
					transcriptText.innerHTML = results
					console.log(results)
				})
			})
			.catch((err) => console.log(err))
```

## limitations
Render disk space is ephemeral and all videos are typically deleted when the server spins down
Spinning down of the server increases the completion time of requests to the server
