 // JavaScript code
 const container = document.getElementById("checkboxContainer");
 const newLabelTextInput = document.getElementById("newLabelText");
 const changeLabelButton = document.getElementById("changeLabelButton");

 // Array of labels for checkboxes
 const checkboxLabels = ["Checkbox 0", "Checkbox 1", "Checkbox 2", "Checkbox 3", "Checkbox 4"];

 // Function to create checkboxes
 function createCheckboxes(labels) {
   labels.forEach((labelText, index) => {
     const checkbox = document.createElement("input");
     checkbox.type = "checkbox";
     checkbox.id = `checkbox${index}`;
     checkbox.name = "checkboxGroup";
     container.appendChild(checkbox);

     const label = document.createElement("label");
     label.htmlFor = `checkbox${index}`;
     label.textContent = labelText;
     container.appendChild(label);

     // Add a click event listener to each checkbox
     checkbox.addEventListener("click", function () {
       if (checkbox.checked) {
         console.log(`Checkbox ${index} is checked.`);
       } else {
         console.log(`Checkbox ${index} is unchecked.`);
       }
     });
   });
 }

 // Call the function to create checkboxes
 createCheckboxes(checkboxLabels);

 // Event listener for the "Change Label" button
 changeLabelButton.addEventListener("click", function () {
   const checkboxToEdit = document.getElementById("checkbox2"); // Change this to target the desired checkbox
   const newLabel = newLabelTextInput.value;

   if (checkboxToEdit) {
     checkboxToEdit.nextSibling.textContent = newLabel; // Update the label text
     newLabelTextInput.value = ""; // Clear the input field
   }
 });

 console.log("finish");