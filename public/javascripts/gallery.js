$(function () {
  let a = true;
  $(".umumiy").click(function () {
    if (a) {
      $(".umumiy_r").css("display", "flex");
      $(".kutubxona").css("display", "none");
      $(".sport").css("display", "none");
      $(".damolish").css("display", "none");
      $(".oshxona").css("display", "none");
      $(".yuvinish").css("display", "none");
    }
  });

  $(".kutubxona_s").click(function () {
    if (a) {
      $(".kutubxona").css("display", "flex");
      $(".umumiy_r").css("display", "none");
      $(".sport").css("display", "none");
      $(".damolish").css("display", "none");
      $(".oshxona").css("display", "none");
      $(".yuvinish").css("display", "none");
    }
  });

  $(".sport_s").click(function () {
    if (a) {
      $(".kutubxona").css("display", "none");
      $(".umumiy_r").css("display", "none");
      $(".sport").css("display", "flex");
      $(".damolish").css("display", "none");
      $(".oshxona").css("display", "none");
      $(".yuvinish").css("display", "none");
    }
  });

  $(".damolish_s").click(function () {
    if (a) {
      $(".kutubxona").css("display", "none");
      $(".umumiy_r").css("display", "none");
      $(".sport").css("display", "none");
      $(".damolish").css("display", "flex");
      $(".oshxona").css("display", "none");
      $(".yuvinish").css("display", "none");
    }
  });

  $(".oshxona_s").click(function () {
    if (a) {
      $(".kutubxona").css("display", "none");
      $(".umumiy_r").css("display", "none");
      $(".sport").css("display", "none");
      $(".damolish").css("display", "none");
      $(".oshxona").css("display", "flex");
      $(".yuvinish").css("display", "none");
    }
  });

  $(".yuvinish_s").click(function () {
    if (a) {
      $(".kutubxona").css("display", "none");
      $(".umumiy_r").css("display", "none");
      $(".sport").css("display", "none");
      $(".damolish").css("display", "none");
      $(".oshxona").css("display", "none");
      $(".yuvinish").css("display", "flex");
    }
  });
});
