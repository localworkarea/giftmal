const selectInput = this.getSelectElement(selectItem, this.selectClasses.classSelectInput).selectElement;
const selectOptions = this.getSelectElement(selectItem, this.selectClasses.classSelectOptions).selectElement;
const selectOptionsItems = selectOptions.querySelectorAll(`.${this.selectClasses.classSelectOption} `);


const _this = this;
selectInput.addEventListener("input", function () {
  selectOptionsItems.forEach(selectOptionsItem => {
    if (selectOptionsItem.textContent.toUpperCase().includes(selectInput.value.toUpperCase())) {
      selectOptionsItem.hidden = false;
    } else {
      selectOptionsItem.hidden = true;
    }
  });
 

  // Якщо список закритий відкриваємо
  selectOptions.hidden === true ? _this.selectAction(selectItem) : null;
});
// Додатково обробник для вибору опції
selectOptionsItems.forEach(selectOptionsItem => {
  selectOptionsItem.addEventListener("click", function () {
      // Після вибору опції очищаємо атрибут hidden для всіх
    selectOptionsItems.forEach(item => {
      setTimeout(() => {
        item.hidden = false;
      }, 300);
    });
  });
});