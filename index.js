window.onload = function() {
  var view = Monkberry.render(Form, FormTesterApp);

  var store = {
    data: {
      resultName: '',
      rating: 0,
      form: {
        firstName: '',
        lastName: '',
        classNumber: 2,
      },
      step: 0,
      substep: 0,
      hideButtons: false,
      tasks: {
        1: {
          images: [
            './img/parrot.jpg',
            './img/train.jpg',
            './img/book.jpg',
            './img/girl.jpg',
            './img/moon.jpg',
          ],
          corrects: ['a parrot', 'a train', 'a book', 'a girl', 'the moon'],
        },
        3: {
          1: {
            result: '',
            correct: '',
          },
        },
      },
    },
    update: function(newState) {
      store.data = Object.assign(
        store.data,
        typeof newState === 'function' ? newState(store.data) : newState,
      );
      view.update(store.data);
    },
  };

  window.store = store;
  store.update();

  var el = document.getElementById('draggable-answers');
  var sortable = Sortable.create(el);

  function formSerialize(view) {
    var firtnameInput = view.querySelector('#child-firstname');
    var lastnameInput = view.querySelector('#child-lastname');
    var classInput = view.querySelector('#child-class');
    var values = {
      firstName: firtnameInput.value,
      lastName: lastnameInput.value,
      classNumber: parseInt(classInput.value),
    };
    if (Object.values(values).some(value => !value)) {
      return false;
    } else {
      return values;
    }
  }

  function submitForm() {
    const newState = {
      step: store.data.step + 1,
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
        [field]: data[field] + (value || 1),
      };
    });
  }

  function checkInputs() {
    document.querySelectorAll('.form-tester__task-inline-inputs input').forEach(function(el, i) {
      if (el.value.toLowerCase() === el.getAttribute('data-correct')) {
        increment('rating');
      }
    });
    store.update(function(data) {
      return { step: data.step + 1 };
    });
  }

  function checkWords() {
    $('.form-tester__task-sentences-words p').each(function(index, elem) {
      var text = '';
      var correct = $(elem).data('correct');
      $(elem)
        .find('button')
        .each(function(index, btn) {
          text += $(btn).text() + ' ';
        });
      text = text.replace(/\s{2,}/, ' ').trim();
      if (correct === text) {
        increment('rating');
      }
    });
    increment('step');
  }

  function checkFinds() {
    var corrects = [
      'She went swimming.',
      'Yes, she did.',
      'In France.',
      'No, they didn’t.',
      'No, he isn’t.',
      'Four.',
    ];
    $('.form-tester__task-find-right li')
      .toArray()
      .map(function(el, index) {
        if (el.textContent === corrects[index]) {
          increment('rating');
        }
      });
    increment('step');
  }



  view.on('click', '#next-btn', function() {
    if (store.data.form.classNumber < 5) {
      switch (store.data.step) {
        case 0:
          submitForm();
          break;
        case 1:
          checkInputs();
          break;
        case 2:
          checkInputs();
          break;
        case 3:
          checkWords();
          break;
        case 4:
          checkFinds();
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
            var el = document.getElementById('draggable-answers');
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
            setResultName();
          break;   
      }
    }
  });

  function setResultName() {
    if(store.data.rating <= 5  && store.data.form.classNumber == 1 ) {
      store.update({
        resultName: 'E10',
      });
    }
    if(store.data.rating >= 6 && store.data.form.classNumber == 1) {
      store.update({
        resultName: 'E11',
      })
    }
    if(store.data.rating >= 15 && store.data.form.classNumber == 1) {
      store.update({
        resultName: 'E12',
      })
    }
    if(store.data.rating >= 33 && store.data.form.classNumber == 1) {
      store.update({
        resultName: 'E13',
      })
    }
    if(store.data.rating >= 58 && store.data.form.classNumber == 1) {
      store.update({
        resultName: 'E14',
      })
    }
    if(store.data.rating <= 5  && store.data.form.classNumber == 1 ) {
      store.update({
        resultName: 'E10',
      });
    }
    if(store.data.rating >= 6 && store.data.form.classNumber == 2) {
      store.update({
        resultName: 'E11',
      })
    }
    if(store.data.rating >= 15 && store.data.form.classNumber == 2) {
      store.update({
        resultName: 'E12',
      })
    }
    if(store.data.rating >= 33 && store.data.form.classNumber == 2) {
      store.update({
        resultName: 'E13',
      })
    }
    if(store.data.rating >= 58 && store.data.form.classNumber == 2) {
      store.update({
        resultName: 'E14',
      })
    }


    if(store.data.rating <= 14 && store.data.form.classNumber == 3) {
      store.update({
        resultName: 'E11',
      })
    }
    if(store.data.rating >= 33 && store.data.form.classNumber == 3) {
      store.update({
        resultName: 'E12',
      })
    }
    if(store.data.rating >= 57 && store.data.form.classNumber == 3) {
      store.update({
        resultName: 'E13',
      })
    }
    if(store.data.rating >= 66 && store.data.form.classNumber == 3) {
      store.update({
        resultName: 'E23',
      })
    }


    if(store.data.rating <= 10 && store.data.form.classNumber == 4) {
      store.update({
        resultName: 'E11',
      })
    }
    if(store.data.rating >= 30 && store.data.form.classNumber == 4) {
      store.update({
        resultName: 'E12',
      })
    }
    if(store.data.rating >= 57 && store.data.form.classNumber == 4) {
      store.update({
        resultName: 'E13',
      })
    }
    if(store.data.rating >= 66 && store.data.form.classNumber == 4) {
      store.update({
        resultName: 'E23',
      })
    }

    if(store.data.rating <= 9 && store.data.form.classNumber == 5) {
      store.update({
        resultName: 'E21',
      })
    }
    if(store.data.rating >= 18 && store.data.form.classNumber == 5) {
      store.update({
        resultName: 'E22',
      })
    }
    if(store.data.rating >= 36 && store.data.form.classNumber == 5) {
      store.update({
        resultName: 'E23',
      })
    }
    if(store.data.rating >= 55 && store.data.form.classNumber == 5) {
      store.update({
        resultName: 'EX23',
      })
    }
    if(store.data.rating >= 84 && store.data.form.classNumber == 5) {
      store.update({
        resultName: 'EX25',
      })
    }

   if(store.data.rating <= 9 && store.data.form.classNumber == 6) {
      store.update({
        resultName: 'E21',
      })
    }
    if(store.data.rating >= 18 && store.data.form.classNumber == 6) {
      store.update({
        resultName: 'E22',
      })
    }
    if(store.data.rating >= 36 && store.data.form.classNumber == 6) {
      store.update({
        resultName: 'E23',
      })
    }
    if(store.data.rating >= 55 && store.data.form.classNumber == 6) {
      store.update({
        resultName: 'EX23',
      })
    }
    if(store.data.rating >= 84 && store.data.form.classNumber == 6) {
      store.update({
        resultName: 'EX25',
      })
    }

    if(store.data.rating <= 18 && store.data.form.classNumber == 7) {
      store.update({
        resultName: 'E31',
      })
    }
    if(store.data.rating >= 37 && store.data.form.classNumber == 7) {
      store.update({
        resultName: 'E23',
      })
    }
    if(store.data.rating >= 56 && store.data.form.classNumber == 7) {
      store.update({
        resultName: 'EX23',
      })
    }
    if(store.data.rating >= 84 && store.data.form.classNumber == 7) {
      store.update({
        resultName: 'EX25',
      })
    }

    if(store.data.rating <= 16 && store.data.form.classNumber == 8) {
      store.update({
        resultName: 'E31',
      })
    }
    if(store.data.rating >= 29 && store.data.form.classNumber == 8) {
      store.update({
        resultName: 'E31',
      })
    }
    if(store.data.rating >= 41 && store.data.form.classNumber == 8) {
      store.update({
        resultName: 'E31',
      })
    }
    if(store.data.rating >= 56 && store.data.form.classNumber == 8) {
      store.update({
        resultName: 'E31',
      })
    }
    if(store.data.rating >= 84 && store.data.form.classNumber == 8) {
      store.update({
        resultName: 'E31',
      })
    }

    if(store.data.rating <= 16 && store.data.form.classNumber == 9) {
      store.update({
        resultName: 'E31',
      })
    }
    if(store.data.rating >= 29 && store.data.form.classNumber == 9) {
      store.update({
        resultName: 'E32',
      })
    }
    if(store.data.rating >= 41 && store.data.form.classNumber == 9) {
      store.update({
        resultName: 'E33',
      })
    }
    if(store.data.rating >= 56 && store.data.form.classNumber == 9) {
      store.update({
        resultName: 'E34',
      })
    }
    if(store.data.rating >= 84 && store.data.form.classNumber == 9) {
      store.update({
        resultName: 'E35',
      })
    }

    if(store.data.rating <= 16 && store.data.form.classNumber == 10) {
      store.update({
        resultName: 'E31',
      })
    }
    if(store.data.rating >= 29 && store.data.form.classNumber == 10) {
      store.update({
        resultName: 'E32',
      })
    }
    if(store.data.rating >= 41 && store.data.form.classNumber == 10) {
      store.update({
        resultName: 'E33',
      })
    }
    if(store.data.rating >= 56 && store.data.form.classNumber == 10) {
      store.update({
        resultName: 'E34',
      })
    }
    if(store.data.rating >= 84 && store.data.form.classNumber == 10) {
      store.update({
        resultName: 'E35',
      })
    }

    if(store.data.rating <= 16 && store.data.form.classNumber == 11) {
      store.update({
        resultName: 'E31',
      })
    }
    if(store.data.rating >= 29 && store.data.form.classNumber == 11) {
      store.update({
        resultName: 'E32',
      })
    }
    if(store.data.rating >= 41 && store.data.form.classNumber == 11) {
      store.update({
        resultName: 'E33',
      })
    }
    if(store.data.rating >= 56 && store.data.form.classNumber == 11) {
      store.update({
        resultName: 'E34',
      })
    }
    if(store.data.rating >= 84 && store.data.form.classNumber == 11) {
      store.update({
        resultName: 'E35',
      })
    }


  }



  view.on('click', '.task1-btn', function(e) {
    var value = e.target.textContent;
    if (value === store.data.tasks[1].corrects[store.data.substep]) {
      increment('rating');
    }
    increment('substep');
    if (store.data.substep > 4) {
      store.update(function(data) {
        return { substep: 0, step: data.step + 1 };
      });
    }
  });

  view.on('click', '.form-tester__task-sentences-words .btn-outline-primary', function(e) {
    var el = e.target;
    var id = e.target.getAttribute('data-id');
    var cloned = el.cloneNode(true);
    el.classList.add('hide');
    document.querySelector('.form-tester__task-sentences-words #words-' + id).appendChild(cloned);
  });

  $('.form-tester__task-sentences-words .btn-outline-danger').click(function() {
    var id = $(this)
      .attr('id')
      .replace('clear-words-', '');
    $('#words-' + id).html('');
    $('.btn-outline-primary[data-id="' + id + '"]').removeClass('hide');
  });

  view.on('click', '#prev-btn', function() {
    increment('step', -1);
  });
};


 

