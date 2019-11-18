$(document).ready(function () {


    function listenForBreedSubmission() {
        $('main').on('submit', '.breed', event => {
            console.log('listenForBreedSubmission() ran');
            event.preventDefault();
            const value = $('#breed').val();
            generateDogImage(value);
        });
    };

    function generateForm() {
        console.log('generateForm() ran');
        return `
        <form role="form" accept-charset="UTF-8" class="breed">
        <fieldset>
        <legend>Breed:</legend>
        <input id="breed" type="text" name="breed" required></input>
        </fieldset>
        <input type="submit" name="Submit">
        </form>`
    };

    function displayForm() {
        //User types in the number of pictures they want (between 1-50, 3 being default if nothing is entered).
        console.log('displayForm() ran');
        $(".js-form").html(generateForm());

    };
    function generateDogImage(value) {
        //User is displayed the random dog images according to the number they entered in the console log.
        console.log(`generateDogImage() with ${value} ran`);
        fetch(`https://dog.ceo/api/breed/${value}/images/random`)
            .then(response => {
                if (response.ok) {
                    return response.json()
                } else {
                    response.json().then(error => Promise.reject(error))
                }
            })
            .then(responseJson => displayDogImages(responseJson))
            .catch(error => alert(`Something went wrong: ${error.message}`));
    };

    function displayDogImages(responseJson) {
        console.log(`displayDogImages() ran with ${responseJson.message}`);
        $('.js-dog-images').empty();
        $('.js-dog-images').html(`<img src="${responseJson.message}">`);
    };

    listenForBreedSubmission();
    displayForm();
});
