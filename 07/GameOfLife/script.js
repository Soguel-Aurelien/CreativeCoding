function findNextGen(mat) {

    let m = mat.length, n = mat[0].length;

    let directions = [
        [ 0, 1 ], [ 1, 0 ], [ 0, -1 ], [ -1, 0 ], [ 1, 1 ],
        [ -1, -1 ], [ 1, -1 ], [ -1, 1 ]
    ];

    for (let i = 0; i < m; i++) {
        for (let j = 0; j < n; j++) {
            let live = 0;

            for (let [dx, dy] of directions) {
                let x = i + dx, y = j + dy;

                if (x >= 0 && x < m && y >= 0 && y < n
                    && (mat[x][y] === 1
                        || mat[x][y] === 3)) {
                    live++;
                }
            }

            if (mat[i][j] === 1 && (live < 2 || live > 3)) {
                mat[i][j] = 3;
            }

            if (mat[i][j] === 0 && live === 3) {
                mat[i][j] = 2;
            }
        }
    }

    for (let i = 0; i < m; i++) {

        let row = "";
        for (let j = 0; j < n; j++) {

            if (mat[i][j] == 2) {
                mat[i][j] = 1;
            }

            if (mat[i][j] == 3) {
                mat[i][j] = 0;
            }

            row += mat[i][j] + " ";
        }
        console.log(row.trim());
    }
}

let mat = [
    [ 0, 1, 0, 0 ], [ 0, 1, 1, 0 ], [ 0, 1, 1, 0 ],
    [ 0, 0, 0, 0 ]
];
findNextGen(mat);