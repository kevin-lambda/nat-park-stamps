import React from "react"

function Footer() {
  return (
    <div>
      <small>
        <strong>About:</strong> National Park Stamp Data from the{" "}
        <a href="https://www.nps.gov/subjects/developer/guides.htm">NPS API</a>.
        For the definitive stamp location list visit{" "}
        <a href="https://americasnationalparks.org/passport-to-your-national-parks/passport-cancellation-locations/">
          americasnationalparks.org
        </a>
      </small>
      <br />
      <small>
        <strong>Built by: </strong>
        <a href="https://kevin-lambda.github.io/">Kevin Lam </a>
        using <a href="https://reactjs.org/">React</a> and{" "}
        <a href="https://picocss.com/">Pico.css</a>.
      </small>
    </div>
  )
}

export default Footer
