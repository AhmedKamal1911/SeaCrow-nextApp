import {
  Body,
  Column,
  Container,
  Head,
  Heading,
  Hr,
  Html,
  Img,
  Preview,
  Row,
  Section,
  Text,
} from "@react-email/components";
import * as React from "react";

interface YelpRecentLoginEmailProps {
  fullName: string;
  email: string;
  subject: string;
  message: string;
}

// const baseUrl = process.env.VERCEL_URL
//   ? `https://${process.env.VERCEL_URL}`
//   : "";

export const HelpMessage = ({
  email,
  fullName,
  message,
  subject,
}: YelpRecentLoginEmailProps) => {
  const formattedDate = new Intl.DateTimeFormat("en", {
    dateStyle: "long",
    timeStyle: "short",
  }).format(new Date());

  return (
    <Html>
      <Head />
      <Preview>Help</Preview>
      <Body style={main}>
        <Container>
          <Section style={darkBlueSection}>
            <table width="100%">
              <tr>
                <td align="center">
                  <Img
                    src="https://img.freepik.com/free-vector/hand-drawn-minimalist-ocean-logo-template_742173-17685.jpg"
                    width="96"
                    height="96"
                    style={{
                      borderRadius: "50%",
                      display: "block",
                    }}
                    alt="logo"
                  />
                </td>
              </tr>
            </table>

            <Heading
              style={{
                fontSize: 26,
                fontWeight: "bold",
                textAlign: "center",
                color: "white",
              }}
            >
              Hi SeaCrow
            </Heading>
            <Heading style={heading}>Help Me!</Heading>
          </Section>

          <Section style={content}>
            <Row style={{ ...boxInfos, paddingBottom: "0" }}>
              <Column>
                <Text style={paragraph}>
                  <b>Problem Time: </b>
                  {formattedDate}
                </Text>
                <Text style={paragraph}>
                  <b>FullName: </b>
                  {fullName}
                </Text>
                <Text style={{ ...paragraph, marginTop: -5 }}>
                  <b>Email: </b>
                  {email}
                </Text>
                <Text style={{ ...paragraph, marginTop: -5 }}>
                  <b>Subject: </b>
                  {subject}
                </Text>
                <Hr
                  style={{
                    borderColor: "#E5E5E5",
                    margin: "0",
                  }}
                />
                <Text style={review}>{message}</Text>
              </Column>
            </Row>
          </Section>

          <Text
            style={{
              textAlign: "center",
              fontSize: 12,
              color: "rgb(0,0,0, 0.7)",
            }}
          >
            © 2025 | Seacrow
          </Text>
        </Container>
      </Body>
    </Html>
  );
};

export default HelpMessage;
import { CSSProperties } from "react";

const heading: CSSProperties = {
  fontSize: "22px",
  lineHeight: "1.3",
  fontWeight: "700",
  color: "yellow",
  textAlign: "center",
};
const review = {
  padding: "24px",
  backgroundColor: "#f2f3f3",
  borderRadius: "4px",
};
const main = {
  backgroundColor: "#fff",
  fontFamily:
    '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Oxygen-Sans,Ubuntu,Cantarell,"Helvetica Neue",sans-serif',
};

const paragraph = {
  fontSize: 16,
};

const content = {
  border: "1px solid rgb(0,0,0, 0.1)",
  borderRadius: "3px",
  overflow: "hidden",
};

const boxInfos = {
  padding: "20px",
};
const darkBlueSection = {
  background: "#0A1931",
  padding: "5px",
};
