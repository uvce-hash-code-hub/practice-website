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
			var number_of_inputs = problems[problem]['number-of-inputs'];
			var scores = []

			// Number of 0s appended is equal to the number of inputs for the problem
			for (var i = 0; i < number_of_inputs; i++)
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
			var number_of_inputs = problems[problem]['number-of-inputs'];
			var scores = []

			// Number of 0s appended is equal to the number of inputs for the problem
			for (var i = 0; i < number_of_inputs; i++)
				scores.push(0);

			problems_and_scores[problem] = scores;
		}
	}

	cookie_content += JSON.stringify(problems_and_scores);
	cookie_content += "; expires=Tue, 31 Dec 2029 23:59:59 UTC";

	document.cookie = cookie_content;
}

function update_cookie(id, results) {
	// Obtain problems.json as a JSON object names "problems"
	var xmlHttp = new XMLHttpRequest();
	xmlHttp.open("GET", 'https://uvce-hash-code-hub.github.io/practice-website/problems.json', false);
	xmlHttp.send(null);

	var problems = JSON.parse(xmlHttp.responseText);

	if (document.cookie == '') {
		var cookie_content = 'problem-scores=';
		var problems_and_scores = {}

		for (problem in problems) {
			var number_of_inputs = problems[problem]['number-of-inputs'];
			var scores = []

			// Number of 0s appended is equal to the number of inputs for the problem
			for (var i = 0; i < number_of_inputs; i++)
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
			var number_of_inputs = problems[problem]['number-of-inputs'];
			var scores = [];

			// Number of 0s appended is equal to the number of inputs for the problem
			for (var i = 0; i < number_of_inputs; i++)
				scores.push(0);

			problems_and_scores[problem] = scores;
		}
		if (problem == id) {
			var number_of_inputs = problems[problem]['number-of-inputs'];
			var scores = [];

			for (var i = 0; i < number_of_inputs; i++)
				scores.push(max(problems_and_scores[problem][i], results[i]['points']));

			problems_and_scores[problem] = scores;
		}
	}

	cookie_content += JSON.stringify(problems_and_scores);
	cookie_content += "; expires=Tue, 31 Dec 2029 23:59:59 UTC";

	document.cookie = cookie_content;
}

function init() {
	// Obtain problems.json as a JSON object names "problems"
	var xmlHttp = new XMLHttpRequest();
	xmlHttp.open("GET", 'https://uvce-hash-code-hub.github.io/practice-website/problems.json', false);
	xmlHttp.send(null);

	var problems = JSON.parse(xmlHttp.responseText);

	// Initialize the cookies to maintain best scores for each problem
	init_cookie();

	dynamic_content = '';

	var id = window.location.href.split('=')[1];

	if (!(id in problems)) {
		document.getElementById('dynamic-content').innerHTML = 'Problem not found';
		return ;
	}

	dynamic_content += `
		<div class="heading1">${problems[id]['problem-name']}</div>
		    <div id="container">
		        <div id="left-pane">
		            <table>
		                <tr>
		                    <td>
		                        <strong>Downloads</strong>
		                    </td>
		                </tr>
		                <tr>
		                    <td>
		                        <a href="problem-statements/${id}.pdf" download>Problem Statement</a>
		                    </td>
		                </tr>
	`

	for (var i = 0; i < problems[id]['number-of-inputs']; i++)
		dynamic_content += `
						<tr>
						    <td>
						        <a href="input-files/${id}/input-${String.fromCharCode(i+97)}.txt" download>Input ${String.fromCharCode(i+65)}</a>
						    </td>
						</tr>
		`

	dynamic_content += `
					</table>
		        </div>

		        <div id="right-pane">
		            <form id="submission">
		                <table>
		                    <tr>
		                        <td></td>
		                        <td></td>
		                        <td><div>Points</div></td>
		                        <td><div>Best Points</div></td>
		                    </tr>

		`

	for (var i = 0; i < problems[id]['number-of-inputs']; i++)
		dynamic_content += `
							<tr>
								<td>Select file ${String.fromCharCode(i+65)}</td>
								<td><input type="file" id="file${i+1}" name="file${i+1}" accept=".txt" /></td>
								<td><div class="points" id="points-${i+1}">0</div></td>
								<td><div class="points" id="best-points-${i+1}">0</div></td>
							</tr>
		`

	dynamic_content += `
		                    <tr>
		                        <td>----------------</td>
		                        <td>----------------</td>
		                        <td>----------------</td>
		                        <td>----------------</td>
		                    </tr>
		                    <tr>
		                        <td><strong>Total Points</strong></td>
		                        <td> </td>
		                        <td><div class="points" id="total-points">0</div></td>
		                        <td><div class="points" id="best-total-points">0</div></td>
		                    </tr>
		                </table>
		            </form>

		            <input type="submit" value="Submit" id="submit" onclick="evaluate_problem('${id}')"/> <br>
		        </div>
		    </div>
		</div>
	`

	document.getElementById('dynamic-content').innerHTML = dynamic_content;
}

function evaluate_score(id, input_content, output_content) {
	if (id == 'fest-scheduling')
		return fest_scheduling_evaluator(input_content, output_content);
	else if (id == 'network-issue')
		return network_issue_evaluator(input_content, output_content);
	else if (id == 'cleanliness-drive')
		return cleanliness_drive_evaluator(input_content, output_content);
	else if (id == 'book-scanning-2020-qualification')
		return book_scanning_2020_qualification_evaluator(input_content, output_content);
	else
		alert('Problem not available');
}

function evaluate_problem(id) {
	var xmlHttp = new XMLHttpRequest();
	xmlHttp.open("GET", 'https://uvce-hash-code-hub.github.io/practice-website/problems.json', false);
	xmlHttp.send(null);

	var problems = JSON.parse(xmlHttp.responseText);

	var n = problems[id]['number-of-inputs'];

	var files = [];
	var file_readers = [];

	var results = {};

	var error_message = '';

	for (let i = 0; i < n; i++) {
		files[i] = document.getElementById(`file${i+1}`).files[0];
		file_readers[i] = new FileReader();

		if (files[i]) {
			var input_file_url = `https://uvce-hash-code-hub.github.io/practice-website/input-files/${id}/input-${String.fromCharCode(i+97)}.txt`
			var xmlHttpFileRequest = new XMLHttpRequest();
			xmlHttpFileRequest.open("GET", input_file_url, false);
			xmlHttpFileRequest.send(null);

			var input_content = xmlHttpFileRequest.responseText;

			file_readers[i].onload = function() {
				var output_content = file_readers[i].result;

				// Obtain the output score for the submission
				result = evaluate_score(id, input_content, output_content);

				if ('error' in result)
					error_message += `${String.fromCharCode(i+65)}: ${result['error']}\n`;
				else
					results[i] = result;
			}

			file_readers[i].readAsText(files[i]);
			document.getElementById(`file${i+1}`).value = "";
		}
	}

	update_cookie(id, results);
	init();
}


