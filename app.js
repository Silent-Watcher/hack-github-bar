import moment from 'moment';
import jsonFile from 'jsonfile';
import random from 'random';

import simpleGit from 'simple-git';
const FILE_PATH = './data.json';

function makeCommits(count) {
  if (count === 0) return simpleGit().push();
  const [x, y] = [random.int(22, 54), random.int(0, 6)];
  let date = moment()
    .subtract(1, 'd')
    .subtract(1, 'y')
    .add(y, 'd')
    .add(x, 'w')
    .format();
  console.log(date);
  jsonFile.writeFile(FILE_PATH, { date }, () => {
    simpleGit()
      .add([FILE_PATH])
      .commit(date, { '--date': date }, makeCommits.bind(this, --count));
  });
}

makeCommits(100);
