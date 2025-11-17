document.addEventListener('DOMContentLoaded', function() {
  // -----------------------------
  // Custom dropdown
  // -----------------------------
  const selects = document.querySelectorAll('.custom-select');
  selects.forEach(sel => {
    const btn = sel.querySelector('.select-btn');
    const list = sel.querySelector('.select-options');
    const selectedText = sel.querySelector('.selected-text');

    btn.addEventListener('click', (e) => {
      const expanded = btn.getAttribute('aria-expanded') === 'true';
      btn.setAttribute('aria-expanded', String(!expanded));
      list.style.display = expanded ? 'none' : 'block';
    });

    list.querySelectorAll('li').forEach(li => {
      li.addEventListener('click', () => selectOption(li));
      li.addEventListener('keydown', (e) => {
        if(e.key === 'Enter' || e.key === ' ') selectOption(li);
      });
    });

    function selectOption(li) {
      list.querySelectorAll('li').forEach(x => x.classList.remove('selected'));
      li.classList.add('selected');
      selectedText.textContent = li.textContent;
      list.style.display = 'none';
      btn.setAttribute('aria-expanded', 'false');
    }

    document.addEventListener('click', (e) => {
      if(!sel.contains(e.target)) { 
        list.style.display = 'none'; 
        btn.setAttribute('aria-expanded','false'); 
      }
    });
  });

  // -----------------------------
  // Input text label validation
  // -----------------------------
  const input = document.getElementById("text1");
  const errorText = document.getElementById("err1");
  const errorIcon = input.parentElement.querySelector(".error-icon");

  function updateInputState() {
    const value = input.value.trim();

    if(value === "" || isValid(value)) {
      input.classList.remove("invalid");
      input.classList.add("valid");
      errorText.textContent = "Assistive text";
      errorText.style.color = "purple";
      errorIcon.style.display = "none";
    } else {
      input.classList.add("invalid");
      input.classList.remove("valid");
      errorText.textContent = "Error message informing me of a problem";
      errorText.style.color = "red";
      errorIcon.style.display = "inline";
    }
  }

  updateInputState();
  input.addEventListener("input", updateInputState);

  function isValid(value) {
    return value.length >= 4 && value.length <= 12;
  }

  // -----------------------------
  // Cancel button clears form
  // -----------------------------
  const form = document.querySelector('form');
  const cancelBtn = document.querySelector('.btn-ghost'); // кнопка Cancel

  if(cancelBtn){
    cancelBtn.addEventListener('click', () => {
      form.reset();

      // Reset input field state
      input.classList.remove("valid", "invalid");
      errorText.textContent = "Assistive text";
      errorText.style.color = "purple";
      errorIcon.style.display = "none";

      // Reset dropdowns to first option
      selects.forEach(sel => {
        const selectedText = sel.querySelector('.selected-text');
        const firstOption = sel.querySelector('li');
        selectedText.textContent = firstOption.textContent;
        sel.querySelectorAll('li').forEach(li => li.classList.remove('selected'));
        firstOption.classList.add('selected');
      });
    });
  }

});
