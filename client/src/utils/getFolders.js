export default function getFolders(items) {
    // Create an empty set to store unique folder names
    const uniqueFolders = new Set();
  
    // Iterate through the array of items and add each "folder" property to the set
    items.forEach(item => {
      if (item.folder) {
        uniqueFolders.add(item.folder);
      }
    });
  
    // Convert the set to an array and return it
    return Array.from(uniqueFolders);
  }