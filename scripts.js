/**
 * Verkefni 8 – Caesar dulmál með vefviðmóti
 *
 * Verður að passa _nákvæmlega_ við gefið HTML, mun annars brotna.
 * Þ.e.a.s., ekki þarf að skrifa meðhöndlun á HTML elementum sem vantar
 */

/**
 * Kóðar streng með því að hliðra honum um n stök.
 *
 * @param {string} str Strengur sem skal kóða, aðeins stafir í stafrófi
 * @param {number} n Hliðrun, heiltala á bilinu [0, lengd stafrófs]
 * @param {string} alphabet Stafróf sem afkóða á út frá
 * @returns {string} Upprunalegi strengurinn hliðraður um n til hægri
 */

function mod(n, m) {
  return ((n % m) + m) % m;
}

function encode(str, n, alphabet) {
  let temp = '';
  for (let i = 0; i < str.length; i += 1) {
    temp += alphabet[mod((alphabet.indexOf(str[i]) + n), alphabet.length)];
  }
  return temp;
}

/**
 * Afkóðar streng með því að hliðra honum um n stök.
 *
 * @param {string} str Strengur sem skal afkóða, aðeins stafir í stafrófi
 * @param {number} n Hliðrun, heiltala á bilinu [0, lengd stafrófs]
 * @param {string} alphabet Stafróf sem afkóða á út frá
 * @returns {string} Upprunalegi strengurinn hliðraður um n til vinstri
 */
function decode(str, n, alphabet) {
  let temp = '';
  for (let i = 0; i < str.length; i += 1) {
    temp += alphabet[mod((alphabet.indexOf(str[i]) - n), alphabet.length)];
  }
  return temp;
}

const Caesar = (() => {
  // Default stafróf, uppfært þegar slegið inn í "alphabet"
  let alphabet = 'AÁBDÐEÉFGHIÍJKLMNOÓPRSTUÚVXYÝÞÆÖ';

  // Default type, uppfært af radio input
  let type = 'encode';

  // Default hliðrun, uppfært af "shift"
  let shift = 3;

  let strengur = '';

  function erStrIAlph() {
    const strTEMP = strengur.toLocaleUpperCase('is-IS');
    for (let i = 0; i < strTEMP.length; i += 1) {
      if (alphabet.indexOf(strTEMP[i]) === -1) {
        // eslint-disable-next-line no-alert
        alert('Strengur ekki í stafrófi. Streng verður eytt');
        strengur = '';
        document.querySelector('#input').value = strengur;
        document.querySelector('.result').innerHTML = '';
        return false;
      }
    }
    return true;
  }

  function encodeOrDecode() {
    if (erStrIAlph()) {
      if (type === 'encode') document.querySelector('.result').innerHTML = encode(strengur.toLocaleUpperCase('is-IS'), parseInt(shift, 10), alphabet);
      else document.querySelector('.result').innerHTML = decode(strengur.toLocaleUpperCase('is-IS'), parseInt(shift, 10), alphabet);
    }
  }

  function prufaShift() {
    shift = document.querySelector('#shift').value;
    document.querySelector('.shiftValue').innerHTML = shift;
    encodeOrDecode();
  }

  function prufaRadio() {
    const radios = document.getElementsByName('type');

    for (let i = 0, { length } = radios; i < length; i += 1) {
      if (radios[i].checked) {
        type = (radios[i].value);

        // only one radio can be logically checked, don't check the rest
        break;
      }
    }
    encodeOrDecode();
  }

  function prufaStreng() {
    strengur = document.querySelector('#input').value;
    encodeOrDecode();
  }

  function prufaAlphabet() {
    alphabet = document.querySelector('#alphabet').value;
    document.querySelector('#shift').max = alphabet.length;
    if (shift > alphabet.length) {
      shift = alphabet.length;
      document.querySelector('.shiftValue').innerHTML = shift;
      document.querySelector('#shift').value = shift;
    }
    encodeOrDecode();
  }

  function init(el) {
    // Setja event handlera á viðeigandi element
    const prufa = el.querySelector('#alphabet');
    prufa.addEventListener('keyup', prufaAlphabet);

    const prufaStr = el.querySelector('#input');
    prufaStr.addEventListener('keyup', prufaStreng);

    const prufaRad = el.querySelector('.radio');
    prufaRad.addEventListener('click', prufaRadio);

    const prufaShi = el.querySelector('#shift');
    prufaShi.addEventListener('mouseup', prufaShift);
  }

  return {
    init,
  };
})();

document.addEventListener('DOMContentLoaded', () => {
  const ceasarForm = document.querySelector('.ceasar');

  Caesar.init(ceasarForm);
});
