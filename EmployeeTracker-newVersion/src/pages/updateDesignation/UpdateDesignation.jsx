import React, { useEffect, useState } from "react";
import { Button, Form } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import ApiService from "../../services/ApiService";

export function UpdateDesignation() {
  const [oldId, setOldId] = useState("");
  const [newId, setNewId] = useState("");
  const [desgs, setDesgs] = useState(null);
  const [status, setStatus] = useState(false);
  const [msg, setMsg] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    ApiService.getAllDesg()
      .then((res) => {
        console.log(res.data);
        setDesgs(res.data);
        setMsg("");
      })
      .catch((error) => {
        console.log(error);

        setMsg(
          error.response.data.errorMessage
            ? error.response.data.errorMessage
            : error.message
        );
      });
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    setStatus(true);
    setMsg("");
    ApiService.updateDesg(oldId, newId)
      .then((res) => {
        console.log(res.data);

        setStatus(false);
        setMsg("");
        navigate("/hr");
      })
      .catch((error) => {
        console.log(error);
        setStatus(false);
        setMsg(
          error.response.data?.errorMessage
            ? error.response.data.errorMessage
            : error.message
        );
      });
  };

  return (
    <div id="add-employee" className="container-sm ">
      <h1 className="title text-center">Update designation</h1>
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3 px-2">
          <Form.Label htmlFor="desgId">
            Designation
            <nobr />
            <span className="text-danger"> *</span>
          </Form.Label>
          <Form.Select
            required
            id="desgId"
            aria-label="employee designation"
            className="selectInput"
            name="desgId"
            onChange={(e) => {
              setOldId(e.target.value);
            }}
          >
            <option value="">{status ? "loading..." : "select "}</option>
            {desgs?.map((type) => (
              <option key={type.desgId} value={type.desgId}>
                {type.desgNames}
              </option>
            ))}
          </Form.Select>
        </Form.Group>
        <Form.Group className="mb-3 px-2">
          <Form.Label htmlFor="desgId">
            Update Designation
            <nobr />
            <span className="text-danger"> *</span>
          </Form.Label>
          <Form.Select
            required
            id="desgId"
            aria-label="employee designation"
            className="selectInput"
            name="desgId"
            onChange={(e) => {
              setNewId(e.target.value);
            }}
          >
            <option value="">{status ? "loading..." : "select "}</option>
            {desgs?.map((type) => (
              <option key={type.desgId} value={type.desgId}>
                {type.desgNames}
              </option>
            ))}
          </Form.Select>
        </Form.Group>
        {/* </div> */}
        <Button className="btn-signup px-2" type="submit">
          Submit
        </Button>{" "}
        <Button as={Link} to="/hr" variant="danger" className="px-2">
          Cancel
        </Button>
        {status && (
          <p className="text-success mb-2">
            Please wait while we are processing your request.
          </p>
        )}
        {<p className="text-danger mb-2">{msg}</p>}
      </Form>
    </div>
  );
}
