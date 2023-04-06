function fest_scheduling_evaluator(input_content, output_content) {
	input_content = input_content.split('\n');
	output_content = output_content.split('\n');

	var n, m, k, i, j, x, y, points = 0;

	temp_arr = input_content[0].split(' ');
	n = temp_arr[0];
	m = temp_arr[1];
	k = temp_arr[2];

	var tags = [];

	for (i = 0; i < n*m; i++)
		tags.push(input_content[i+1].split(' '));

	var assignments = output_content;

	while (assignments.length > 0 && assignments[0] == '')
		assignments.pop();

	while (assignments.length > 0 && assignments[assignments.length-1] == '')
		assignments.pop();

	if (assignments.length != n)
		return {'result': 'WA', 'error': 'N lines not present in output', 'points': 0}

	for (i = 0; i < n; i++) {
		assignments[i] = assignments[i].split(' ');

		if (assignments[i].length < m)
			return {'result': 'WA', 'error': `M integers not present in line ${i+1}`, 'points': 0}
	}

	for (i = 0; i < n; i++)
		for (j = 0; j < m; j++)
			if (assignments[i][j] < 1 || assignments[i][j] > n*m)
				return {'result': 'WA', 'error': `Wrong index. Event ${assignments[i][j]} not present`, 'points': 0}

	for (i = 0; i < n; i++) {
		s = new Set();

		for (j = 0; j < m; j++)
			for (x = 0; x < k; x++)
				s.add(tags[assignments[i][j]-1][x])

		points += s.size
	}

	return {'result': 'AC', 'points': points}
}

function network_issue_evaluator() {
	
}

function cleanliness_drive() {
	
}

function book_scanning_2020_qualification() {
	
}

