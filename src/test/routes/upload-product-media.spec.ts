import request from "supertest";
import { expect } from "chai";

import createServer from "server";
const app = createServer();

describe("POST /upload-product-media", () => {
    request(app)
        .post("/upload-product-media")
        .attach("files", "src/test/resources/image.png")
        .field("shopId", "123")
        .field("fileKeys", ["image1"])
        .expect(200)
        .end((err, res) => {
            if (err) {
                console.error(err);
            }
            
            expect(res.body).to.have.property("message").to.equal("Files uploaded successfully");
        });
});