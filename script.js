// Import Swiper and styles
    <script>
        const swiper = new Swiper('.swiper', {
          loop: true,
          autoplay: {
            delay: 2500,
            disableOnInteraction: false,
            pauseOnMouseEnter: true,
          },
          slidesPerView: 3,
          spaceBetween: 30,
          pagination: {
            el: '.swiper-pagination',
            clickable: true
          },
          navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev'
          },
          breakpoints: {
            768: {
              slidesPerView: 4
            },
            1024: {
              slidesPerView: 5
            }
          }
        });
    </script>
