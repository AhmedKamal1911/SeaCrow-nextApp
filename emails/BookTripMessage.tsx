import { TripTicket } from "@/lib/types/shared";

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

// const baseUrl = process.env.VERCEL_URL
//   ? `https://${process.env.VERCEL_URL}`
//   : "";

export const BookTripMessage = ({
  email,
  firstName,
  lastName,
  phoneNumber,
  hotelName,
  adultCount,
  childCount,
  babiesCount,
  checkDate,
  country,
  message,
}: TripTicket) => {
  const formattedDate = new Intl.DateTimeFormat("en", {
    dateStyle: "long",
    timeStyle: "short",
  }).format(new Date());

  return (
    <Html>
      <Head />
      <Preview>SeaCrow</Preview>
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
            <Heading style={heading}>Trip Ticket!</Heading>
          </Section>

          <Section style={content}>
            <Row style={{ ...boxInfos, paddingBottom: "0" }}>
              <Column>
                <Text style={paragraph}>
                  <b>Ticket Time: </b>
                  {formattedDate}
                </Text>
                <Text style={paragraph}>
                  <b>FullName: </b>
                  {firstName} {lastName}
                </Text>
                <Text style={{ ...paragraph, marginTop: -5 }}>
                  <b>Email: </b>
                  {email}
                </Text>
                <Text style={{ ...paragraph, marginTop: -5 }}>
                  <b>Phone Number: </b>
                  {phoneNumber}
                </Text>
                <Text style={{ ...paragraph, marginTop: -5 }}>
                  <b>Hotel Name: </b>
                  {hotelName}
                </Text>
                <Text style={{ ...paragraph, marginTop: -5 }}>
                  <b>Adult Count: </b>
                  {adultCount}
                </Text>
                <Text style={{ ...paragraph, marginTop: -5 }}>
                  <b>Child Count: </b>
                  {childCount}
                </Text>
                <Text style={{ ...paragraph, marginTop: -5 }}>
                  <b>Babies Count: </b>
                  {babiesCount}
                </Text>
                <Text style={{ ...paragraph, marginTop: -5 }}>
                  <b>Check Date: </b>
                  {checkDate}
                </Text>

                <Text style={{ ...paragraph, marginTop: -5 }}>
                  <b>Country: </b>
                  {country}
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

export default BookTripMessage;
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
