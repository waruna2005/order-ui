export const showHideLoading = (loading) => {
  console.log("######################", loading);
  if (document.getElementById("overlay")) {
    document.getElementById("overlay").style.display = loading
      ? "block"
      : "none";
  }
};
