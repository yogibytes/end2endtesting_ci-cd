import { z } from "zod";
import express from "express";

export const app = express();

app.use(express.json());

const sumInput = z.object({
  a: z.number(),
  b: z.number(),
});

app.post("/sum", (req, res) => {
  const parsedResponse = sumInput.safeParse(req.body);

  if (!parsedResponse.success) {
    return res.status(411).json({
      message: "Incorrect inputs",
    });
  }

  const { a, b } = parsedResponse.data;
  const answer = a + b;

  res.status(200).json({
    answer,
  });
});

app.get("/sum", (req, res) => {
  const parsedResponse = sumInput.safeParse({
    a: Number(req.headers.a),
    b: Number(req.headers.b),
  });

  if (!parsedResponse.success) {
    return res.status(411).json({
      message: "Incorrect inputs",
    });
  }

  const { a, b } = parsedResponse.data;
  const answer = a + b;

  res.status(200).json({
    answer,
  });
});
