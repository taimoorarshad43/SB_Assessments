// categories is the main data structure for the app; it looks like this:

//  [
//    { title: "Math",
//      clues: [
//        {question: "2+2", answer: 4, showing: null},
//        {question: "1+1", answer: 2, showing: null}
//        ...
//      ],
//    },
//    { title: "Literature",
//      clues: [
//        {question: "Hamlet Author", answer: "Shakespeare", showing: null},
//        {question: "Bell Jar Author", answer: "Plath", showing: null},
//        ...
//      ],
//    },
//    ...
//  ]

let categories = [];
const NUM_CATEGORIES = 6;
const NUM_QUESTIONS_PER_CAT = 5;
const BASE_API_URL = "https://rithm-jeopardy.herokuapp.com/api";


/** Get NUM_CATEGORIES random category from API.
 *
 * Returns array of category ids
 */

async function getCategoryIds() {
  const res = await axios.get(`${BASE_API_URL}/categories?count=100`);
  const allCategoryIds = res.data.map(cat => cat.id);
  return _.sampleSize(allCategoryIds, NUM_CATEGORIES);
}


/** Return object with data about a category:
 *
 *  Returns { title: "Math", clues: clue-array }
 *
 * Where clue-array is:
 *   [
 *      {question: "Hamlet Author", answer: "Shakespeare", showing: null},
 *      {question: "Bell Jar Author", answer: "Plath", showing: null},
 *      ...
 *   ]
 */

async function getCategory(catId) {
  const res = await axios.get(`${BASE_API_URL}/category?id=${catId}`);
  const cat = res.data;

  const clues = _.sampleSize(cat.clues, NUM_QUESTIONS_PER_CAT).map(clue => ({
    question: clue.question,
    answer: clue.answer,
    showing: null
  }));

  return { title: cat.title, clues };
}

/** Fill the HTML table#jeopardy with the categories & cells for questions.
 *
 * - The <thead> should be filled w/a <tr>, and a <td> for each category
 * - The <tbody> should be filled w/NUM_QUESTIONS_PER_CAT <tr>s,
 *   each with a question for each category in a <td>
 *   (initally, just show a "?" where the question/answer would go.)
 */

function fillTableHtml() {
  const $thead = $("#jeopardy thead");
  const $tbody = $("#jeopardy tbody");
  $thead.empty();
  $tbody.empty();

  // Headers
  const $tr = $("<tr>");
  for (let cat of categories) {
    $tr.append($("<th>").text(cat.title));
  }
  $thead.append($tr);

  // Clues
  for (let clueIdx = 0; clueIdx < NUM_QUESTIONS_PER_CAT; clueIdx++) {
    const $tr = $("<tr>");
    for (let catIdx = 0; catIdx < NUM_CATEGORIES; catIdx++) {
      const $td = $("<td>")
        .attr("id", `${catIdx}-${clueIdx}`)
        .text("?");
      $tr.append($td);
    }
    $tbody.append($tr);
  }
}

/** Handle clicking on a clue: show the question or answer.
 *
 * Uses .showing property on clue to determine what to show:
 * - if currently null, show question & set .showing to "question"
 * - if currently "question", show answer & set .showing to "answer"
 * - if currently "answer", ignore click
 * */

function handleClick(evt) {
  const id = evt.target.id;
  const [catIdx, clueIdx] = id.split("-").map(Number);
  const clue = categories[catIdx].clues[clueIdx];

  if (clue.showing === null) {
    $(`#${id}`).text(clue.question);
    clue.showing = "question";
  } else if (clue.showing === "question") {
    $(`#${id}`).text(clue.answer);
    clue.showing = "answer";
  }
}


/** Wipe the current Jeopardy board, show the loading spinner,
 * and update the button used to fetch data.
 */

function showLoadingView() {
  $("#jeopardy").hide();
  $("#spin-container").show();
}

function hideLoadingView() {
  $("#spin-container").hide();
  $("#jeopardy").show();
}

/** Start game:
 *
 * - get random category Ids
 * - get data for each category
 * - create HTML table
 * */

async function setupAndStart() {
  showLoadingView();
  const catIds = await getCategoryIds();
  categories = [];

  for (let id of catIds) {
    const cat = await getCategory(id);
    categories.push(cat);
  }

  fillTableHtml();
  hideLoadingView();
}

$("#spin-container").show()

$(async function () {
  $("#start").on("click", setupAndStart);
  $("#jeopardy").on("click", "td", handleClick);
});

/** On click of start / restart button, set up game. */

// TODO

/** On page load, add event handler for clicking clues */

// TODO