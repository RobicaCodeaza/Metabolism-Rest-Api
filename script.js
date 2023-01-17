// SELECTING DOM ELEMENTS

//--------------------------------------------------------------
// SELECTING ALL DATABASE BUTTONS
const buttonGetAll = document.querySelector('.btn--persons');
const buttonCreateOne = document.querySelector('.btn--create');
const buttonDeleteAll = document.querySelector('.btn--deleteAll');

// SELECTING OTHER BUTTONS
const buttonMaximizeAll = document.querySelectorAll('.btn--maximize');
const buttonMinimizeAll = document.querySelectorAll('.btn--minimize');
//--------------------------------------------------------------

// SELECTING FORMS

const formLeft = document.querySelector('.form-details--left');
const formRight = document.querySelector('.form-details--right');

// SELECTIONG OTHER ELEMENTS

const result = document.querySelector('.bmr-result');
const resultText = document.querySelector('.bmr-result-text--color');
const bmrConclusion = document.querySelector('.bmr-conclusion-text');

const sideLeftContainerPersons = document.querySelector(
  '.side--left-container-persons'
);
//--------------------------------------------------------------
// GENERAL FUNCTIONS
const verify = function (pers) {
  if (pers.fullname && pers.age && pers.weightKG && pers.heightCM) {
    return 1;
  } else {
    return 0;
  }
};
const formInputPass = function (e) {
  const fullname =
    e.currentTarget.parentElement.querySelector('.full-name').value;
  const age = e.currentTarget.parentElement.querySelector('.age').value;
  const heightCM =
    e.currentTarget.parentElement.querySelector('.heightCM').value;
  const weightKG =
    e.currentTarget.parentElement.querySelector('.weightKG').value;
  // console.log({ fullName, age, heightCM, weightKG });
  return { fullname, age, heightCM, weightKG };
};
const formInputReset = function (e) {
  e.currentTarget.parentElement.querySelector('.full-name').value = '';
  e.currentTarget.parentElement.querySelector('.age').value = '';
  e.currentTarget.parentElement.querySelector('.heightCM').value = '';
  e.currentTarget.parentElement.querySelector('.weightKG').value = '';
  e.currentTarget.parentElement.querySelector('.gender').value = '';
  return e;
};
const formPlaceholdersReset = function (e) {};

const createPersonBox = function (pers, gender) {
  const personBox = document.createElement('div');
  personBox.classList.add('person-box');
  personBox.innerHTML = `
    
                  <button class="btn btn--delete class--active">
                    <ion-icon name="close-outline" class="btn-icon"></ion-icon>
                  </button>
                  <span class="person-box__id">${pers.id}</span>
                  <span class="person-box__name">${pers.fullname.toUpperCase()}</span>
                  <span class="person-box__gender">${gender}</span>
                  <form
                    name="form-details"
                    class="form-details form-details--left"
                  >
                    <div>
                      <label for="full-name">Full Name</label>
                      <input
                        id="full-name"
                        type="text"
                        class="full-name"
                        placeholder="${pers.fullname}"
                        name="full-name"
                        required
                      />
                    </div>
                    <div>
                      <label for="age">Age</label>
                      <input
                        id="age"
                        type="number"
                        class="age"
                        placeholder="${pers.age}"
                        name="age"
                        required
                      />
                    </div>
                    <div>
                      <label for="heightCM">Height(cm)</label>
                      <input
                        id="heightCM"
                        type="number"
                        class="heightCM"
                        placeholder="${pers.heightCM}"
                        name="heightCM"
                        required
                      />
                    </div>
                    <div>
                      <label for="WeightKG">Weight(kg)</label>
                      <input
                        id="WeightKG"
                        type="number"
                        class="weightKG"
                        placeholder="${pers.weightKG}"
                        name="WeightKG"
                        required
                      />
                    </div>
                    <div>
                      <label for="select-gender">GENDER</label>
                      <select id="select-gender" class="gender" name="select-gender" required>
                        <option value="">Please choose one option:</option>
                        <option value="male">Male</option>
                        <option value="female">Female</option>
                      </select>
                    </div>
                    <!-- <input type="submit" class="btn btn-form" placeholder="Sign-up now"/> -->
                    <button type="submit" class="btn btn--form btn--update">
                      Update Details
                    </button>
                    <!-- <input type="checkbox" />
                <input type="number" /> -->
                  </form>
                  <button class="btn btn--show">
                    <ion-icon
                      class="btn-icon btn--maximize class--active"
                      name="caret-forward-outline"
                    ></ion-icon>
                    <ion-icon
                      class="btn-icon btn--minimize"
                      name="caret-back-outline"
                    ></ion-icon>
                  </button>`;
  sideLeftContainerPersons.insertAdjacentElement('afterbegin', personBox);
};

const options = function (method, headers, person) {
  const body = JSON.stringify(person);
  return { method, headers, body };
};

//--------------------------------------------------------------

//--------------------------------------------------------------
// ADDING SIMPLE FUNCTIONALITY
const listeningShow = function () {
  console.log('entered listening show');
  let buttonShowAll = document.querySelectorAll('.btn--show');
  buttonShowAll.forEach((btnShow) =>
    btnShow.addEventListener('click', function (e) {
      e.currentTarget.firstElementChild.classList.toggle('class--active');
      e.currentTarget.lastElementChild.classList.toggle('class--active');

      const formDetails = e.currentTarget.parentElement.querySelector(
        '.form-details--left'
      );
      formDetails.classList.toggle('class--active');
      formDetails.classList.toggle('class--grid');

      e.currentTarget.parentElement
        .querySelector('.btn--delete')
        .classList.toggle('class--active');
    })
  );
};

// DELETING ONE

const listeningDelete = function () {
  console.log('entered listening delete');
  let buttonsDelete = document.querySelectorAll('.btn--delete');
  buttonsDelete.forEach((btnDeleteOne) => {
    btnDeleteOne.addEventListener('click', async function (e) {
      try {
        console.log('entered');
        const id =
          e.currentTarget.parentElement.querySelector(
            '.person-box__id'
          ).textContent;
        console.log(id);
        e.currentTarget.parentElement.remove();
        const data = await fetch(
          `http://localhost:8000/api/persons/${id}`,
          options('DELETE', { 'Content-Type': 'application/json' })
        );
      } catch (err) {
        console.error(err);
      }
    });
  });
};
// UPDATING ONE
const listeningUpdate = function () {
  console.log('entering listening update');
  const buttonsUpdate = document.querySelectorAll('.btn--update');
  buttonsUpdate.forEach((btnUpdate) => {
    btnUpdate.addEventListener('click', async function (e) {
      // GETTING CURRENT ID TO UPDATE THE PERSON
      const id =
        e.currentTarget.parentElement.parentElement.querySelector(
          '.person-box__id'
        ).textContent;

      // DEFINING PERSON BOX ELEMENTS
      const gender = e.currentTarget.parentElement.parentElement.querySelector(
        '.person-box__gender'
      );

      const person = formInputPass(e);

      if (verify(person)) {
        e.currentTarget.parentElement.parentElement.querySelector(
          '.person-box__name'
        ).textContent = person.fullname;
        gender.textContent =
          e.currentTarget.parentElement.querySelector('.gender').value;

        // RESETTING PLACEHOLDERS
        const fullName =
          e.currentTarget.parentElement.querySelector('.full-name');
        fullName.placeholder = person.fullname;
        const age = e.currentTarget.parentElement.querySelector('.age');
        age.placeholder = person.age;
        const heightCM =
          e.currentTarget.parentElement.querySelector('.heightCM');
        heightCM.placeholder = person.heightCM;
        const weightKG =
          e.currentTarget.parentElement.querySelector('.weightKG');
        weightKG.placeholder = person.weightKG;

        calcBMR(person, gender.textContent);

        // RESETTING INPUT FIELDS
        formInputReset(e);
        // UPDATING DATA FROM DATABASE
        const data = await fetch(
          `http://localhost:8000/api/persons/${id}`,
          options('PUT', { 'Content-Type': 'application/json' }, person)
        );
      }
    });
  });
};
// INIT
const init = function () {
  listeningShow();
  listeningDelete();
  listeningUpdate();
};

//--------------------------------------------------------------
//BMR CALC

const calcBMR = function (pers, gender) {
  const bmrEcuationResult =
    10 * pers.weightKG + 6.25 * pers.heightCM - 5 * pers.age;

  if (gender === 'male') {
    result.textContent = bmrEcuationResult + 5;
    // resultText.style.setProperty('background-color', '#FED049');
  }
  if (gender === 'female') {
    result.textContent = bmrEcuationResult - 161;
    // resultText.style.setProperty('background-color', '#FF0032');
  }
  bmrConclusion.innerHTML = `
    If you want to <strong>gain</strong> some weight you should eat : <strong>
    ${Number(result.textContent) + 500} kcal</strong>.
    <br />
    You would potentially gain between <strong>(0.2 - 0.5kg)</strong> per week if you eat in a caloric surplus.
    <br />
    If you want to <strong>lose</strong> some weight you should eat :
    <strong>${Number(result.textContent) - 500} kcal</strong>.
    <br />
    You would pottentially lose between <strong>(0.2 - 0.5kg)</strong> per week if you eat in a caloric deficit.
  
  `;
  resultText.classList.add('bmr-result-text--active');
  bmrConclusion.classList.add('bmr-conclusion-text--active');

  setTimeout(() => {
    resultText.classList.remove('bmr-result-text--active');
    bmrConclusion.classList.remove('bmr-conclusion-text--active');
  }, 15000);
};

//--------------------------------------------------------------

//--------------------------------------------------------------

//==============================================================
// WORKING WITH SINGLE USER
//--------------------------------------------------------------
// CREATING USER
buttonCreateOne.addEventListener('click', async function (e) {
  try {
    // e.preventDefault();
    const person = formInputPass(e);

    if (verify(person)) {
      const gender =
        e.currentTarget.parentElement.querySelector('.gender').value;
      calcBMR(person, gender);
      formInputReset(e);
      const data = await fetch(
        `http://localhost:8000/api/persons/addPerson`,
        options('POST', { 'Content-Type': 'application/json' }, person)
      );
      const dataJSON = await data.json();
      createPersonBox(dataJSON, gender);
      init();
    }
  } catch (err) {
    console.error(err);
  }
});
//--------------------------------------------------------------

//--------------------------------------------------------------
// UPDATING USER - IMPLEMENTED IN FUNCTIONS ABOVE
//--------------------------------------------------------------

//--------------------------------------------------------------
// DELETING USER - IMPLEMENTED IN FUNCTIONS ABOVE
//--------------------------------------------------------------

//==============================================================
// WORKING WITH ALL USERS
//--------------------------------------------------------------
// DELETING ALL USERS
buttonDeleteAll.addEventListener('click', async function (e) {
  console.log('entered');
  e.preventDefault();
  const data = await fetch(
    `http://localhost:8000/api/persons/allPersons`,
    options('GET', { 'Content-Type': 'application/json' })
  );
  const dataJSON = await data.json();
  dataJSON.forEach(async function (pers) {
    const id = pers.id;
    console.log(id);

    const data = await fetch(
      `http://localhost:8000/api/persons/${id}`,
      options('DELETE', { 'Content-Type': 'application/json' })
    );
    sideLeftContainerPersons.innerHTML = '';
  });
});

//--------------------------------------------------------------

//--------------------------------------------------------------
//SEE ALL USERS
buttonGetAll.addEventListener(
  'click',
  async function (e) {
    e.preventDefault();
    const data = await fetch(
      `http://localhost:8000/api/persons/allPersons`,
      options('GET', { 'Content-Type': 'application/json' })
    );
    const dataJSON = await data.json();
    dataJSON.forEach((pers) => createPersonBox(pers, 'G'));
    init();
  },
  { once: true }
);

//--------------------------------------------------------------
