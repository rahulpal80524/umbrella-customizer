document.addEventListener('DOMContentLoaded', () => {
  const umbrella = document.getElementById('umbrella');
  const logo = document.getElementById('logo');
  const logoUpload = document.getElementById('logo-upload');
  const colorSwatches = document.querySelectorAll('.color-swatch');
  const uploadIcon = document.querySelector('.upload-icon');
  const cancelIcon = document.querySelector('.cancel-icon');
  const uploadText = document.querySelector('.upload-text');

  const umbrellaImages = {
    blue: 'images/Blue_umbrella.png',
    pink: 'images/Pink_umbrella.png',
    yellow: 'images/Yello_umbrella.png'
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

  uploadIcon.addEventListener('click', (event) => {
    event.stopPropagation(); // Prevent the click event from bubbling up
    logoUpload.click();
  });

  logoUpload.addEventListener('click', (event) => {
    event.stopPropagation(); // Prevent the click event from bubbling up
  });

  logoUpload.addEventListener('change', (event) => {
    const file = event.target.files[0];
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
    
    if (file) {
      umbrella.classList.add('spin');
      uploadIcon.src = 'images/loader_icon.svg'; // Replace upload icon with loader icon
      uploadIcon.classList.add('spin'); // Add spin class to the loader icon
      cancelIcon.classList.remove('hidden'); // Show cancel icon

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
  });

  cancelIcon.addEventListener('click', (event) => {
    event.stopPropagation(); // Prevent the click event from bubbling up
    clearTimeout(uploadTimeout);
    stopUploadProcess();
    logo.style.display = 'none'; // Hide the logo
    uploadText.textContent = 'UPLOAD LOGO'; // Reset the upload text
    cancelIcon.classList.add('hidden'); // Hide the cancel icon
    logoUpload.value = ''; // Clear the file input value
  });

  function stopUploadProcess() {
    umbrella.classList.remove('spin');
    uploadIcon.src = 'images/upload.png'; // Revert back to upload icon
    uploadIcon.classList.remove('spin'); // Remove spin class
  }

  function resetUploadIcon() {
    uploadIcon.src = 'images/upload.png'; // Revert back to upload icon
    uploadIcon.classList.remove('spin'); // Remove spin class
    cancelIcon.classList.add('hidden'); // Hide cancel icon
    uploadText.textContent = 'UPLOAD LOGO'; // Reset the upload text
  }
});
