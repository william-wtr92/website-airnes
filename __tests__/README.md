
<h1>Jest Testing</h1>

<p>Jest has enabled us to check that our features are working properly, by setting up Unit Tests.</p>

<p>The documentation provided by Next.js is fairly comprehensive and includes the config and setup files required for the library to function properly. Find more information at <a href="https://nextjs.org/docs/pages/building-your-application/optimizing/testing">Next.js Documentation</a></p>

<h2>Installation</h2>
<p>To install the dependency run the command: <code>npm i jest</code></p>

<h2>Project Setup</h2>
<p>At the root of your project you will need to create 2 config files (jest.config.js & jest.setup.js), the contents of which are available in the documentation link just above.</p>

<p>You will also need to create a __tests__ folder containing the tests for all your pages and a __mock__ folder, the contents of which are also given by default in the documentation.</p>

<h2>Creating a Test</h2>
<p>To create a test, generate a new file called [pagename].test.jsx and import the page to be tested directly into its code.</p>

<p>
  <code>
    import { render, screen } from "@testing-library/react"<br>
    import Main, { getServerSideProps } from "@/pages/index"
  </code>
</p>

<p>In this file I'm testing the index.js page, so I've named the test file index.test.js</p>

<p><code>render</code> & <code>screen</code> are utilities from the <code>@testing-library/react</code> library</p>

<p><code>screen</code> is used to test DOM elements. For example, <code>screen.getByText('Hello')</code> will allow you to select an element containing the text 'Hello'.</p>

<h2>Jest functions</h2>
<p>
  <code>
    describe("jest functions", () => {<br>
      it("should equal 1000", () => {<br>
    const values = 500 + 500<br>
    expect(values).toBe(1000)<br>
      })<br>
    })
  </code>
</p>

<p><code>describe</code> is a jest function which can encompass several tests. It takes a string as an argument, which allows you to describe what you want to test, and secondly the test functions.</p>

<p><code>it</code> is a function used to define a test to be performed. This function takes 2 arguments: a string describing the test to be performed, and a function defining the test.</p>

<p><code>expect</code> is used to check whether the correct value is rendered.</p>

