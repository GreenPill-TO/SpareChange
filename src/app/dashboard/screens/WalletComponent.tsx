"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/Avatar";
import { Button } from "@/components/ui/Button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/Dialog";
import { Input } from "@/components/ui/Input";
import { Label } from "@/components/ui/Label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/RadioGroup";
import { Switch } from "@/components/ui/Switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/Tabs";
import { Camera, CreditCard, DollarSign, QrCode, Send, Share2, User, Users } from "lucide-react";
import { useState } from "react";
import { toast } from "react-toastify";
import { Area, AreaChart, CartesianGrid, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";

const balanceHistory = [
  { date: "2023-06-01", balance: 800 },
  { date: "2023-06-15", balance: 950 },
  { date: "2023-06-30", balance: 1100 },
  { date: "2023-07-15", balance: 1000 },
  { date: "2023-07-30", balance: 1200 },
];

const recentTransactions = [
  { id: 1, type: "Received", amount: 100, from: "Alice", date: "2023-07-30" },
  { id: 2, type: "Sent", amount: 50, to: "Bob", date: "2023-07-29" },
  { id: 3, type: "Charity", amount: 20, to: "Save the Trees", date: "2023-07-28" },
  { id: 4, type: "Received", amount: 200, from: "Work", date: "2023-07-27" },
  { id: 5, type: "Sent", amount: 30, to: "Coffee Shop", date: "2023-07-26" },
];

const charityContributionData = [
  { date: "2023-05-01", TheShelter: 10, TheFoodBank: 0 },
  { date: "2023-06-01", TheShelter: 15, TheFoodBank: 0 },
  { date: "2023-07-01", TheShelter: 20, TheFoodBank: 5 },
  { date: "2023-08-01", TheShelter: 18, TheFoodBank: 12 },
  { date: "2023-09-01", TheShelter: 22, TheFoodBank: 18 },
];

export function MobileWalletDashboardComponent() {
  const [balance, setBalance] = useState(1000);
  const [qrTcoinAmount, setQrTcoinAmount] = useState("");
  const [qrCadAmount, setQrCadAmount] = useState("");
  const [tcoinAmount, setTcoinAmount] = useState("");
  const [cadAmount, setCadAmount] = useState("");
  const [showAmountInCad, setShowAmountInCad] = useState(false);
  const [selectedCharity, setSelectedCharity] = useState("The FoodBank");
  const [selectedContact, setSelectedContact] = useState("");
  const exchangeRate = 3.3;

  const [charityData, setCharityData] = useState({
    personalContribution: 50,
    allUsersToCharity: 600,
    allUsersToAllCharities: 7000,
  });

  const convertToCad = (tcoin: number) => (tcoin * exchangeRate).toFixed(2);
  const convertToTcoin = (cad: number) => (cad / exchangeRate).toFixed(2);

  const formatNumber = (value: string, isCad: boolean) => {
    const num = parseFloat(value.replace(/[^\d.]/g, ""));
    if (isNaN(num)) return isCad ? "$0.00" : "0.00 TCOIN";
    const formatted = num.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
    return isCad ? `$${formatted}` : `${formatted} TCOIN`;
  };

  const handleAmountChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    setCadAmount: React.Dispatch<React.SetStateAction<string>>,
    setTcoinAmount: React.Dispatch<React.SetStateAction<string>>
  ) => {
    const { name, value } = e.target;
    const numericValue = value.replace(/[^\d.]/g, "");
    if (name === "tcoin") {
      setTcoinAmount(formatNumber(numericValue, false));
      setCadAmount(formatNumber(convertToCad(parseFloat(numericValue)), true));
    } else {
      setCadAmount(formatNumber(numericValue, true));
      setTcoinAmount(formatNumber(convertToTcoin(parseFloat(numericValue)), false));
    }
  };

  const handleQrAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    const numericValue = value.replace(/[^\d.]/g, "");
    if (name === "qrTcoin") {
      setQrTcoinAmount(formatNumber(numericValue, false));
      setQrCadAmount(formatNumber(convertToCad(parseFloat(numericValue)), true));
    } else {
      setQrCadAmount(formatNumber(numericValue, true));
      setQrTcoinAmount(formatNumber(convertToTcoin(parseFloat(numericValue)), false));
    }
  };

  return (
    <div className="container mx-auto p-4 space-y-6">
      <header className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">TCOIN Wallet</h1>
        <div className="flex space-x-2">
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="ghost" size="icon">
                <Camera className="h-6 w-6" />
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Scan QR Code</DialogTitle>
                <DialogDescription>Use your device's camera to scan a QR code for payment.</DialogDescription>
              </DialogHeader>
              <div className="flex items-center justify-center h-64 bg-gray-100 rounded-md">Camera feed would appear here</div>
            </DialogContent>
          </Dialog>
          <Dialog>
            <DialogTrigger asChild>
              <Avatar>
                <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
                <AvatarFallback>
                  <User className="h-6 w-6" />
                </AvatarFallback>
              </Avatar>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>User Profile</DialogTitle>
                <DialogDescription>Manage your account settings and preferences.</DialogDescription>
              </DialogHeader>
              <div className="space-y-4">
                <div className="flex items-center space-x-4 mb-4">
                  <Avatar className="w-20 h-20">
                    <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
                    <AvatarFallback>
                      <User className="h-12 w-12" />
                    </AvatarFallback>
                  </Avatar>
                  <Button variant="link" className="p-0 h-auto" onClick={() => console.log("Change avatar")}>
                    Change avatar
                  </Button>
                </div>
                <p>
                  <strong>Name:</strong> John Doe
                </p>
                <p>
                  <strong>Email:</strong> john.doe@example.com
                </p>
                <Button className="w-full">Edit Profile</Button>
                <Button className="w-full" variant="outline">
                  Log Out
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Charitable Contributions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <p>
                My default charity: <strong>{selectedCharity}</strong>{" "}
                <Dialog>
                  <DialogTrigger asChild>
                    <Button variant="link" className="p-0 h-auto font-normal text-blue-500">
                      change
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Change Default Charity</DialogTitle>
                      <DialogDescription>Select a new default charity for your contributions.</DialogDescription>
                    </DialogHeader>
                    <RadioGroup defaultValue={selectedCharity} onValueChange={setSelectedCharity}>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="The FoodBank" id="charity1" />
                        <Label htmlFor="charity1">The FoodBank</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="The Shelter" id="charity2" />
                        <Label htmlFor="charity2">The Shelter</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="Save the Trees" id="charity3" />
                        <Label htmlFor="charity3">Save the Trees</Label>
                      </div>
                    </RadioGroup>
                    <div className="flex justify-end space-x-2 mt-4">
                      <Button variant="outline" onClick={() => setSelectedCharity("The FoodBank")}>
                        Cancel
                      </Button>
                      <Button disabled={selectedCharity === "The FoodBank"}>Set as default</Button>
                    </div>
                  </DialogContent>
                </Dialog>
              </p>
              <p>
                My contribution to {selectedCharity}: {charityData.personalContribution} TCOIN
              </p>
              <p>
                All users to {selectedCharity}: {charityData.allUsersToCharity} TCOIN
              </p>
              <p>All users to all charities: {charityData.allUsersToAllCharities} TCOIN</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Receive</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center">
              <QrCode className="mx-auto h-32 w-32" />
              <p className="mt-2 qr-code-text">Your default QR code (unspecified amount)</p>
            </div>
            <div className="space-y-2">
              <Input name="qrTcoin" value={qrTcoinAmount} onChange={handleQrAmountChange} placeholder="Enter TCOIN amount" />
              <Input name="qrCad" value={qrCadAmount} onChange={handleQrAmountChange} placeholder="Enter CAD amount" />
              <Button
                onClick={() => {
                  console.log("Update QR for", qrTcoinAmount);
                  const qrTextElement = document.querySelector(".qr-code-text");
                  if (qrTextElement) {
                    qrTextElement.textContent = `QR code for ${qrTcoinAmount}`;
                  }
                }}
                className="w-full"
              >
                Update QR Code
              </Button>
            </div>
            <div className="flex space-x-2">
              <Dialog>
                <DialogTrigger asChild>
                  <Button className="flex-1">
                    <Users className="mr-2 h-4 w-4" /> Request from Contact
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Request from Contact</DialogTitle>
                    <DialogDescription>Select a contact to request TCOIN from.</DialogDescription>
                  </DialogHeader>
                  <div className="space-y-4">
                    <Input placeholder="Search contacts..." />
                    <RadioGroup onValueChange={setSelectedContact}>
                      <div className="space-y-2">
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="Alice" id="contact1" />
                          <Label htmlFor="contact1">Alice</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="Bob" id="contact2" />
                          <Label htmlFor="contact2">Bob</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="Charlie" id="contact3" />
                          <Label htmlFor="contact3">Charlie</Label>
                        </div>
                      </div>
                    </RadioGroup>
                    <Button
                      className="w-full"
                      disabled={!selectedContact}
                      onClick={() => console.log(`Requesting ${qrTcoinAmount} from ${selectedContact}`)}
                    >
                      Request {qrTcoinAmount}
                    </Button>
                  </div>
                </DialogContent>
              </Dialog>
              <Dialog>
                <DialogTrigger asChild>
                  <Button className="flex-1">
                    <Share2 className="mr-2 h-4 w-4" /> Share
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Share QR Code</DialogTitle>
                    <DialogDescription>Share your QR code via different methods.</DialogDescription>
                  </DialogHeader>
                  <div className="space-y-4">
                    <Button className="w-full">Share via Email</Button>
                    <Button className="w-full">Share via SMS</Button>
                    <Button
                      className="w-full"
                      onClick={() => {
                        navigator.clipboard
                          .writeText("https://example.com/qr-code-link")
                          .then(() => {
                            toast.success("The QR code link has been copied to your clipboard.");
                            // toast({
                            // title: "Link copied",  // Uncomment this line to show a title, but requires import of useToast instead of react-toastify
                            //description: "The QR code link has been copied to your clipboard.", // Uncomment this line to show a description
                            // })
                          })
                          .catch((err) => {
                            console.error("Failed to copy: ", err);
                          });
                      }}
                    >
                      Copy Link
                    </Button>
                  </div>
                </DialogContent>
              </Dialog>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Pay / Send</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <Dialog>
              <DialogTrigger asChild>
                <Button className="w-full">
                  <Camera className="mr-2 h-4 w-4" /> Scan QR to Pay
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Scan QR Code</DialogTitle>
                  <DialogDescription>Use your device's camera to scan a QR code for payment.</DialogDescription>
                </DialogHeader>
                <div className="flex items-center justify-center h-64 bg-gray-100 rounded-md">Camera feed would appear here</div>
              </DialogContent>
            </Dialog>
            <div className="space-y-2">
              <Input
                name="tcoin"
                value={tcoinAmount}
                onChange={(e) => handleAmountChange(e, setCadAmount, setTcoinAmount)}
                placeholder="Enter TCOIN amount"
              />
              <Input
                name="cad"
                value={cadAmount}
                onChange={(e) => handleAmountChange(e, setCadAmount, setTcoinAmount)}
                placeholder="Enter CAD amount"
              />
            </div>
            <Dialog>
              <DialogTrigger asChild>
                <Button className="w-full">
                  <Send className="mr-2 h-4 w-4" /> Send to Contact
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Send to Contact</DialogTitle>
                  <DialogDescription>Select a contact to send TCOIN to.</DialogDescription>
                </DialogHeader>
                <div className="space-y-4">
                  <Input placeholder="Search contacts..." />
                  <ul className="space-y-2">
                    <li>
                      <Button variant="ghost" className="w-full justify-start">
                        Alice
                      </Button>
                    </li>
                    <li>
                      <Button variant="ghost" className="w-full justify-start">
                        Bob
                      </Button>
                    </li>
                    <li>
                      <Button variant="ghost" className="w-full justify-start">
                        Charlie
                      </Button>
                    </li>
                  </ul>
                </div>
              </DialogContent>
            </Dialog>
          </CardContent>
        </Card>

        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>My Account</CardTitle>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="graph" className="w-full">
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="graph">Graph</TabsTrigger>
                <TabsTrigger value="balance">Balance</TabsTrigger>
                <TabsTrigger value="transactions">Transactions</TabsTrigger>
                <TabsTrigger value="charity">Charity</TabsTrigger>
              </TabsList>
              <TabsContent value="graph">
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={balanceHistory}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="date" />
                      <YAxis />
                      <Tooltip />
                      <Line type="monotone" dataKey="balance" stroke="#8884d8" />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </TabsContent>
              <TabsContent value="balance">
                <div className="text-center">
                  <h2 className="text-2xl font-bold mb-2">Your Balance</h2>
                  <p className="text-4xl font-bold">{formatNumber(balance.toString(), false)}</p>
                  <p className="text-xl">{formatNumber(convertToCad(balance), true)}</p>
                </div>
              </TabsContent>
              <TabsContent value="transactions">
                <div className="flex items-center space-x-2 mb-4">
                  <Switch id="currency-toggle" checked={showAmountInCad} onCheckedChange={setShowAmountInCad} />
                  <Label htmlFor="currency-toggle">Show amounts in {showAmountInCad ? "CAD" : "TCOIN"}</Label>
                </div>
                <ul className="space-y-2">
                  {recentTransactions.map((transaction) => (
                    <li key={transaction.id} className="flex justify-between items-center">
                      <div>
                        <p className="font-semibold">{transaction.type}</p>
                        <p className="text-sm text-gray-500">{transaction.from ? `From: ${transaction.from}` : `To: ${transaction.to}`}</p>
                      </div>
                      <div className="text-right">
                        <p className={`font-semibold ${transaction.type === "Received" ? "text-green-600" : "text-red-600"}`}>
                          {transaction.type === "Received" ? "+" : "-"}
                          {showAmountInCad
                            ? formatNumber(convertToCad(transaction.amount), true)
                            : formatNumber(transaction.amount.toString(), false)}
                        </p>
                        <p className="text-sm text-gray-500">
                          Charity:{" "}
                          {showAmountInCad
                            ? formatNumber((transaction.amount * 0.03 * exchangeRate).toString(), true)
                            : formatNumber((transaction.amount * 0.03).toString(), false)}
                        </p>
                        <p className="text-sm text-gray-500">{transaction.date}</p>
                      </div>
                    </li>
                  ))}
                </ul>
              </TabsContent>
              <TabsContent value="charity">
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={charityContributionData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="date" />
                      <YAxis />
                      <Tooltip />
                      <Area type="monotone" dataKey="TheShelter" stackId="1" stroke="#8884d8" fill="#8884d8" />
                      <Area type="monotone" dataKey="TheFoodBank" stackId="1" stroke="#82ca9d" fill="#82ca9d" />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Other</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <Dialog>
                <DialogTrigger asChild>
                  <Button className="w-full">
                    <CreditCard className="mr-2 h-4 w-4" /> Top Up with Interac eTransfer
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Top Up with Interac eTransfer</DialogTitle>
                    <DialogDescription>Send an Interac eTransfer to top up your TCOIN balance.</DialogDescription>
                  </DialogHeader>
                  <div className="space-y-4">
                    <p>
                      <strong>Destination email:</strong> topup@tcoin.me
                    </p>
                    <p>
                      <strong>Reference number:</strong> {Math.random().toString(36).substring(2, 10).toUpperCase()}
                    </p>
                    <p className="text-sm text-gray-500">
                      Note: You must send the eTransfer from a bank account with the same owner as this TCOIN account. The balance will show up within
                      24 hours.
                    </p>
                  </div>
                </DialogContent>
              </Dialog>
              <Dialog>
                <DialogTrigger asChild>
                  <Button className="w-full">
                    <DollarSign className="mr-2 h-4 w-4" /> Convert TCOIN to CAD and Off-ramp
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Convert and Off-ramp</DialogTitle>
                    <DialogDescription>Convert your TCOIN to CAD and transfer to your bank account.</DialogDescription>
                  </DialogHeader>
                  <div className="space-y-4">
                    <Input placeholder="Amount in TCOIN" />
                    <p>Estimated CAD: $0.00</p>
                    <Input placeholder="Interac eTransfer email or phone" />
                    <p className="text-sm text-gray-500">Note: The transfer will be completed within the next 24 hours.</p>
                    <Button className="w-full">Convert and Transfer</Button>
                  </div>
                </DialogContent>
              </Dialog>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
