import {fireEvent, render, waitFor} from "@testing-library/react"
import "@testing-library/jest-dom"
import Form from "../../src/components/form.jsx"
import fetchMock from "jest-fetch-mock"

fetchMock.enableMocks();

describe("Form", () => {

  beforeAll( () => {
    fetch.mockResponse(JSON.stringify({
      "idk": {
        "definition": "I Don't Know"
      }
    }));
  });

  it("renders", async () => {
    const {findByText} = render(<Form/>);

    expect(await findByText(/Start by entering a slang/i)).toBeInTheDocument();
  });

  it("finds a definition", async () => {
    const {findByRole, findByText} = render(<Form/>);

    const input = await findByRole("textbox");
    fireEvent.change(input, {target: {value: 'idk'}})
    await waitFor(() => expect(input.value).toBe('idk'));

    let button = await findByRole("button");
    fireEvent.click(button);

    await waitFor(async () => {
      expect(await findByText(/I Don't Know/i)).toBeInTheDocument();
    });
  });

  it("shows an error when it's not able to finds a definition", async () => {
    const {findByRole, findByText} = render(<Form/>);

    const input = await findByRole("textbox");
    fireEvent.change(input, {target: {value: "something"}})
    await waitFor(() => expect(input.value).toBe("something"));

    let button = await findByRole("button");
    fireEvent.click(button);

    await waitFor(async () => {
      expect(await findByText(/his entry does not exist in our records as of yet /i)).toBeInTheDocument();
    });
  });
});
