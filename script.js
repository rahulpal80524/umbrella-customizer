document.addEventListener('DOMContentLoaded', () => {
  const umbrella = document.getElementById('umbrella');
  const logo = document.getElementById('logo');
  const logoUpload = document.getElementById('logo-upload');
  const colorSwatches = document.querySelectorAll('.color-swatch');
  const uploadIcon = document.querySelector('.upload-icon');
  const cancelIcon = document.querySelector('.cancel-icon');
  const uploadText = document.querySelector('.upload-text');
  const loader = document.getElementById('loader');

  const umbrellaImages = {
    skyblue: 'images/Blue_umbrella.png',
    pink: 'images/Pink_umbrella.png',
    yellow: 'images/Yellow_umbrella.png'
  };

  let uploadTimeout;

  colorSwatches.forEach(swatch => {
    swatch.addEventListener('click', () => {
      const color = swatch.getAttribute('data-color');
      umbrella.src = umbrellaImages[color];
      document.getElementById('upload-label').style.backgroundColor = color;
      document.getElementById('upload-label').style.borderColor = color;
      resetUploadIcon();
      logo.style.display = 'none'; // Hide the logo when the color is changed
      uploadText.textContent = 'UPLOAD LOGO'; // Reset the upload text when the color is changed
    });
  });

  // Attach event listeners
  uploadIcon.addEventListener('click', handleUploadIconClick);
  logoUpload.addEventListener('click', handleLogoUploadClick);
  logoUpload.addEventListener('change', handleLogoUploadChange);
  cancelIcon.addEventListener('click', handleCancelIconClick);

  function handleUploadIconClick(event) {
    console.log('Upload icon clicked');
    event.stopPropagation(); // Prevent the click event from bubbling up
    logoUpload.click();
  }

  function handleLogoUploadClick(event) {
    console.log('Logo upload clicked');
    event.stopPropagation(); // Prevent the click event from bubbling up
  }

  function handleLogoUploadChange(event) {
    console.log('Logo upload changed');
    const file = event.target.files[0];
    if (!file) {
      console.log('No file selected');
      return;
    }
    if (file.size > 5 * 1024 * 1024) {
      alert('File size must be less than 5MB.');
      resetUploadIcon();
      logoUpload.value = ''; // Clear the file input value
      return;
    }

    if (!file.type.match('image/png') && !file.type.match('image/jpeg')) {
      alert('Only .png and .jpg files are allowed.');
      resetUploadIcon();
      logoUpload.value = ''; // Clear the file input value
      return;
    }

    console.log('File accepted, processing...');
    if (file) {
      startUploadProcess();

      const reader = new FileReader();
      reader.onload = (e) => {
        logo.src = e.target.result;
        // Logo will be shown at the end of the spinning process
        uploadTimeout = setTimeout(() => {
          stopUploadProcess();
          logo.style.display = 'block';
          uploadText.textContent = file.name.toUpperCase(); // Display the file name in uppercase after spinner stops
        }, 2000); // 2 seconds delay
      };
      reader.readAsDataURL(file);
    }
  }

  function handleCancelIconClick(event) {
    console.log('Cancel icon clicked');
    event.stopPropagation(); // Prevent the click event from bubbling up
    clearTimeout(uploadTimeout);
    stopUploadProcess();
    logo.style.display = 'none'; // Hide the logo
    uploadText.textContent = 'UPLOAD LOGO'; // Reset the upload text
    cancelIcon.classList.add('hidden'); // Hide the cancel icon
    logoUpload.value = ''; // Clear the file input value
  }

  function startUploadProcess() {
    console.log('Starting upload process');
    umbrella.classList.add('spin');
    loader.classList.remove('hidden'); // Show loader
    uploadIcon.classList.add('hidden'); // Hide upload icon
    cancelIcon.classList.remove('hidden'); // Show cancel icon
  }

  function stopUploadProcess() {
    console.log('Stopping upload process');
    umbrella.classList.remove('spin');
    loader.classList.add('hidden'); // Hide loader
    uploadIcon.classList.remove('hidden'); // Show upload icon
    cancelIcon.classList.add('hidden'); // Hide cancel icon
  }

  function resetUploadIcon() {
    console.log('Resetting upload icon');
    loader.classList.add('hidden'); // Hide loader
    uploadIcon.classList.remove('hidden'); // Show upload icon
    uploadIcon.classList.remove('spin'); // Remove spin class
    cancelIcon.classList.add('hidden'); // Hide cancel icon
    uploadText.textContent = 'UPLOAD LOGO'; // Reset the upload text
  }
});
