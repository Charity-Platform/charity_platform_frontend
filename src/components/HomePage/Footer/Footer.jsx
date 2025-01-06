import "./Footer.css";

const Footer = () => {
  return (
    <div>
      <footer class="footer">
        <div class="container">
          <div class="row">
            <div class="col-lg-4 col-md-6 mb-4 mb-md-0" dir="rtl">
              <h5 class="text-uppercase">استشارة </h5>
              <p>
               نطمح من خلال منصتنا الي تقديم افضل الخدمات والحلول للصعوبات التي تواجه موسسة العمل الخيري والإنساني هدفنا تقديم الدعم والمساندة المناسبة لضمان استدامة العمل الخيري ورفع كفاءته
              </p>
            </div>

            <div class="col-lg-4 col-md-6 mb-4 mb-md-0">
              <h5 class="text-uppercase">روابط سريعة</h5>
              <ul class="list-unstyled mb-0">
                <li>
                  <a href="#!">الرئيسية</a>
                </li>
                <li>
                  <a href="#!">من نحن</a>
                </li>
                <li>
                  <a href="#!">خدماتنا</a>
                </li>
                <li>
                  <a
                    href="https://wa.me/0096565012126"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <i
                      className="fab fa-whatsapp"
                      style={{ marginLeft: "0px" }}
                    ></i>{" "}
                    اتصل بنا
                  </a>
                </li>
              </ul>
            </div>

            <div class="col-lg-4 col-md-12 mb-4 mb-md-0">
              <h5 class="text-uppercase">تابعنا</h5>
              <div class="social-icons">
                <a href="#!" class="fab fa-facebook"></a>
                <a href="#!" class="fab fa-twitter"></a>
                <a href="#!" class="fab fa-instagram"></a>
                <a href="#!" class="fab fa-linkedin"></a>
              </div>
            </div>
          </div>
          <div class="row mt-5">
            <div class="col-12 text-center mt-4">
              <p>جميع الحقوق محفوظة لدى استشارة © 2024</p>
              <h6>
                <a href="#" className="color:#000">
                  ❤ MTI_Coder
                </a>
              </h6>
            </div>
          </div>
        </div>
      </footer>

      <script src="https://code.jquery.com/jquery-3.5.1.slim.min.js"></script>
      <script src="https://cdn.jsdelivr.net/npm/@popperjs/core@2.5.2/dist/umd/popper.min.js"></script>
      <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/js/bootstrap.min.js"></script>
    </div>
  );
};

export default Footer;
