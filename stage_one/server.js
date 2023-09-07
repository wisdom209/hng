const express = require('express');

const app = express();
const PORT = process.env.PORT || 4000;

app.get('/api', (req, res) => {
	const { slack_name, track } = req.query;
	const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
	
	const responseObject = {
		slack_name,
		current_day: days[new Date(Date.now()).getDay()],
		utc_time: new Date(Date.now()).toISOString().slice(0, -5) + 'Z',
		track,
		github_file_url: 'https://github.com/wisdom209/hng/blob/main/stage_one/server.js',
		github_repo_url: 'https://github.com/wisdom209/hng',
		status_code: 200
	};

	res.status(200).json(responseObject);
});

app.listen(PORT, ()=>{
	console.log(`Server now listening on port ${PORT}`)
})
module.exports = app;
