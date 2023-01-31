function init_cookie() {
	// Obtain problems.json as a JSON object names "problems"
	var xmlHttp = new XMLHttpRequest();
	xmlHttp.open("GET", 'https://uvce-hash-code-hub.github.io/practice-website/problems.json', false);
	xmlHttp.send(null);

	var problems = JSON.parse(xmlHttp.responseText);

	if (document.cookie == '') {
		var cookie_content = 'problem-scores=';
		var problems_and_scores = {}

		for (problem in problems) {
			var n = problems[problem]['number-of-inputs'];
			var scores = []

			// Number of 0s appended is equal to the number of inputs for the problem
			for (var i = 0; i < n; i++)
				scores.push(0);

			problems_and_scores[problem] = scores;
		}

		cookie_content += JSON.stringify(problems_and_scores);
		cookie_content += "; expires=Tue, 31 Dec 2029 23:59:59 UTC";

		document.cookie = cookie_content;
	}

	var cookie_content = 'problem-scores=';
	var problems_and_scores = JSON.parse(document.cookie.split(';')[0].split('=')[1]);

	for (problem in problems) {
		// Check for problems whose score is not present in the cookie and initialize the cookie again
		if (!(problem in problems_and_scores)) {
			var n = problems[problem]['number-of-inputs'];
			var scores = []

			// Number of 0s appended is equal to the number of inputs for the problem
			for (var i = 0; i < n; i++)
				scores.push(0);

			problems_and_scores[problem] = scores;
		}
	}

	cookie_content += JSON.stringify(problems_and_scores);
	cookie_content += "; expires=Tue, 31 Dec 2029 23:59:59 UTC";

	document.cookie = cookie_content;
	alert(document.cookie);
}

function init() {
	// Obtain problems.json as a JSON object names "problems"
	var xmlHttp = new XMLHttpRequest();
	xmlHttp.open("GET", 'https://uvce-hash-code-hub.github.io/practice-website/problems.json', false);
	xmlHttp.send(null);

	var problems = JSON.parse(xmlHttp.responseText);

	// Initialize the cookies to maintain best scores for each problem
	init_cookie();

	// Provide links to access all the problems
	var html_problem_list = '';

	html_problem_list += `
			<div class="subtitle">
				Problems
			</div>

			<ul class="problem-list">
	`;

	for (problem in problems)
		if (problems[problems]['isuvce'])
			html_problem_list += `
					<li><a href="/problems/${problem}">${problems[problem]['problem-name']}</a></li>
			`;

	html_problem_list += `
			</ul>

			<div class="subtitle">
				Hash Code Problems
			</div>

			<ul class="problem-list">
	`;

	for (problem in problems)
		if (!problems[problems]['isuvce'])
			html_problem_list += `
					<li><a href="/problems/${problem}">${problems[problem]['problem-name']}</a></li>
			`;

	html_problem_list += `
			</ul>
		</div>
	`;

	document.getElementById('problems').innerHTML = html_problem_list;
}
