
export default function AnimationsContent(){
    return (
        <div className="LeftLoginConteiner">
          <h1 className="JoinLeft">
            JOIN INTO A NEW <br></br> SPACE
          </h1>
          <p>Make new friends while learn about bullshit unhelpful! </p>

          <div class="spinner">
            <div class="spinner1"></div>
          </div>

          {/* animation area here*/}
          <div class="loader">
            <div class="head"></div>

            <div class="flames">
              <div class="particle"></div>
              <div class="particle"></div>
              <div class="particle"></div>
              <div class="particle"></div>
              <div class="particle"></div>
              <div class="particle"></div>
              <div class="particle"></div>
              <div class="particle"></div>
            </div>

            <div class="eye"></div>
          </div>
        </div>
    )
}