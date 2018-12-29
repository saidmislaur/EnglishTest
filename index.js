window.onload = function() {
  var view = Monkberry.render(Form, FormTesterApp);

  var classType = {
    1: "junior",
    2: "junior",
    3: "junior",
    4: "junior",
    5: "old",
    6: "old",
    7: "old",
    8: "old",
    9: "old",
    10: "old",
    11: "old"
  };

  var store = {
    data: {
      resultName: "",
      rating: 0,
      form: {
        firstName: "",
        lastName: "",
        classNumber: 2
      },
      step: 0,
      substep: 0,
      hideButtons: false,
      tasks: {
        1: {
          images: [
            "./img/parrot.jpg",
            "./img/train.jpg",
            "./img/book.jpg",
            "./img/girl.jpg",
            "./img/moon.jpg"
          ],
          corrects: ["a parrot", "a train", "a book", "a girl", "the moon"]
        },
        3: {
          1: {
            result: "",
            correct: ""
          }
        }
      }
    },
    update: function(newState) {
      store.data = Object.assign(
        store.data,
        typeof newState === "function" ? newState(store.data) : newState
      );
      view.update(store.data);
    }
  };

  window.store = store;
  store.update();

  var el = document.getElementById("draggable-answers");
  var sortable = Sortable.create(el);

  function formSerialize(view) {
    var firtnameInput = view.querySelector("#child-firstname");
    var lastnameInput = view.querySelector("#child-lastname");
    var classInput = view.querySelector("#child-class");
    var values = {
      firstName: firtnameInput.value,
      lastName: lastnameInput.value,
      classNumber: parseInt(classInput.value)
    };
    if (Object.values(values).some(value => !value)) {
      return false;
    } else {
      return values;
    }
  }

  function submitForm() {
    const newState = {
      step: store.data.step + 1
    };
    if (!store.data.step) {
      newState.form = formSerialize(view);
      if (!newState.form) {
        return;
      }
    }
    store.update(newState);
  }

  function increment(field, value) {
    store.update(function(data) {
      return {
        [field]: data[field] + (value || 1)
      };
    });
  }

  function checkInputs(step, classNumber) {
    document
      .querySelectorAll(
        "#step-" +
          store.data.step +
          "-" +
          classType[store.data.form.classNumber] +
          " .form-tester__task-inline-inputs input"
      )
      .forEach(function(el, i) {
        var userValue = el.value.toLowerCase();
        var dataCorrect = el.getAttribute("data-correct");

        if (userValue && dataCorrect.indexOf(userValue) >= 0) {
          store.update({
            rating: store.data.rating + 2
          });
        }
      });
    store.update(function(data) {
      return { step: data.step + 1 };
    });
  }

  function checkWords() {
    $(".form-tester__task-sentences-words p").each(function(index, elem) {
      var text = "";
      var correct = $(elem).data("correct");
      $(elem)
        .find("button")
        .each(function(index, btn) {
          text += $(btn).text() + " ";
        });
      text = text.replace(/\s{2,}/, " ").trim();
      if (correct === text) {
        store.update({
          rating: store.data.rating + 5
        });
      }
    });
    increment("step");
  }

  function checkFinds() {
    var corrects = [
      "She went swimming.",
      "Yes, she did.",
      "In France.",
      "No, they didn’t.",
      "No, he isn’t.",
      "Four."
    ];
    $(".form-tester__task-find-right li")
      .toArray()
      .map(function(el, index) {
        if (el.textContent === corrects[index]) {
          store.update({
            rating: store.data.rating + 3
          });
        }
      });
    increment("step");
  }

  function checkTwoFinds() {
    var corrects = [
      "No, thanks.",
      "Yes, that’s a good idea.",
      "Walk towards the shopping center then turn right.",
      "Yes, I have.",
      "For three years.",
      "I don’t agree."
    ];
    $(".form-tester__task-find-right li")
      .toArray()
      .map(function(el, index) {
        if (el.textContent === corrects[index]) {
          store.update({
            rating: store.data.rating + 3
          });
        }
      });
    increment("step");
  }

  view.on("click", "#next-btn", function() {
    if (store.data.form.classNumber < 5) {
      switch (store.data.step) {
        case 0:
          submitForm();
          break;
        case 1:
          checkInputs();
          break;
        case 2:
          checkInputs(2, 5);
          break;
        case 3:
          checkWords();
          break;
        case 4:
          checkTwoFinds();
          setResultName();
          break;
      }
    } else {
      switch (store.data.step) {
        case 0:
          submitForm();
          break;
        case 1:
          checkInputs();
          var el = document.getElementById("draggable-answers");
          var sortable = Sortable.create(el);
          break;
        case 2:
          checkFinds();
          break;
        case 3:
          checkInputs();
          break;
        case 4:
          checkInputs();
          break;
        case 5:
          checkInputs();
          setResultName();
          break;
      }
    }
  });

  function setResultName() {
    var ratings = [
      {
        rating: 0,
        class: 1,
        name: "E10"
      },
      {
        rating: 6,
        class: 1,
        name: "E11"
      },
      {
        rating: 15,
        class: 1,
        name: "E12"
      },
      {
        rating: 33,
        class: 1,
        name: "E13"
      },
      { rating: 58, class: 1, name: "E23" },

      {
        rating: 0,
        class: 2,
        name: "E10"
      },
      {
        rating: 6,
        class: 2,
        name: "E11"
      },
      {
        rating: 15,
        class: 2,
        name: "E12"
      },
      {
        rating: 33,
        class: 2,
        name: "E13"
      },
      {
        rating: 58,
        class: 1,
        name: "E23"
      },

      {
        rating: 0,
        class: 3,
        name: "E11"
      },
      {
        rating: 15,
        class: 3,
        name: "E12"
      },
      {
        rating: 33,
        class: 3,
        name: "E13"
      },
      {
        rating: 58,
        class: 3,
        name: "E23"
      },

      {
        rating: 0,
        class: 4,
        name: "E11"
      },
      {
        rating: 11,
        class: 4,
        name: "E12"
      },
      {
        rating: 31,
        class: 4,
        name: "E13"
      },
      {
        rating: 58,
        class: 4,
        name: "E23"
      },

      {
        rating: 0,
        class: 5,
        name: "E21"
      },
      {
        rating: 10,
        class: 5,
        name: "E22"
      },
      {
        rating: 19,
        class: 5,
        name: "E23"
      },
      {
        rating: 37,
        class: 5,
        name: "EX23"
      },
      {
        rating: 56,
        class: 5,
        name: "EX25"
      },

      {
        rating: 0,
        class: 6,
        name: "E21"
      },
      {
        rating: 10,
        class: 6,
        name: "E22"
      },
      {
        rating: 19,
        class: 6,
        name: "E23"
      },
      {
        rating: 37,
        class: 6,
        name: "EX23"
      },
      {
        rating: 56,
        class: 6,
        name: "EX25"
      },

      {
        rating: 0,
        class: 7,
        name: "E31"
      },
      {
        rating: 18,
        class: 7,
        name: "E23"
      },
      {
        rating: 37,
        class: 7,
        name: "EX23"
      },
      {
        rating: 56,
        class: 7,
        name: "EX25"
      },

      {
        rating: 0,
        class: 8,
        name: "E31"
      },
      {
        rating: 16,
        class: 8,
        name: "E32"
      },
      {
        rating: 29,
        class: 8,
        name: "E33"
      },
      {
        rating: 41,
        class: 8,
        name: "EX25"
      },
      {
        rating: 56,
        class: 8,
        name: "EX26"
      },

      {
        rating: 0,
        class: 9,
        name: "E31"
      },
      {
        rating: 16,
        class: 9,
        name: "E32"
      },
      {
        rating: 29,
        class: 9,
        name: "E33"
      },
      {
        rating: 41,
        class: 9,
        name: "E34"
      },
      {
        rating: 56,
        class: 9,
        name: "E35"
      },

      {
        rating: 0,
        class: 10,
        name: "E31"
      },
      {
        rating: 16,
        class: 10,
        name: "E32"
      },
      {
        rating: 29,
        class: 10,
        name: "E33"
      },
      {
        rating: 41,
        class: 10,
        name: "E34"
      },
      {
        rating: 56,
        class: 10,
        name: "E35"
      },

      { rating: 0, class: 11, name: "E31" },
      { rating: 16, class: 11, name: "E32" },
      { rating: 29, class: 11, name: "E33" },
      { rating: 41, class: 11, name: "E34" },
      { rating: 56, class: 11, name: "E35" }
    ];

    var ratingsCount = ratings.length;

    for (var i = 0; i < ratingsCount; i++) {
      if (
        store.data.rating >= ratings[i].rating &&
        store.data.form.classNumber == ratings[i].class
      ) {
        var res = ratings[i].name;
      }
    }
    store.update({
      resultName: res
    });
  }

  view.on("click", ".task1-btn", function(e) {
    var value = e.target.textContent;
    if (value === store.data.tasks[1].corrects[store.data.substep]) {
      increment("rating");
    }
    increment("substep");
    if (store.data.substep > 4) {
      store.update(function(data) {
        return { substep: 0, step: data.step + 1 };
      });
    }
  });

  view.on("click", ".form-tester__task-sentences-words .btn-outline-primary", function(e) {
    var el = e.target;
    var id = e.target.getAttribute("data-id");
    var cloned = el.cloneNode(true);
    el.classList.add("hide");
    document.querySelector(".form-tester__task-sentences-words #words-" + id).appendChild(cloned);
  });

  $(".form-tester__task-sentences-words .btn-outline-danger").click(function() {
    var id = $(this)
      .attr("id")
      .replace("clear-words-", "");
    $("#words-" + id).html("");
    $('.btn-outline-primary[data-id="' + id + '"]').removeClass("hide");
  });

  view.on("click", "#prev-btn", function() {
    increment("step", -1);
  });
};
