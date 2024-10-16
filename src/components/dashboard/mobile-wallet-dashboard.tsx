'use client'

import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/dashboard/ui/card"
import { Input } from "@/components/dashboard/ui/input"
import { Button } from "@/components/dashboard/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/dashboard/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/dashboard/ui/tabs"
import { Camera, User, QrCode, Share2, Send, Users, CreditCard, DollarSign } from 'lucide-react'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'
import { Switch } from "@/components/dashboard/ui/switch"
import { Label } from "@/components/dashboard/ui/label"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/dashboard/ui/dialog"

// Simulated data
const charityData = {
  personalContribution: 50,
  allUsersToCharity: 600,
  allUsersToAllCharities: 7000
}

const balanceHistory = [
  { date: '2023-06-01', balance: 800 },
  { date: '2023-06-15', balance: 950 },
  { date: '2023-06-30', balance: 1100 },
  { date: '2023-07-15', balance: 1000 },
  { date: '2023-07-30', balance: 1200 },
]

const recentTransactions = [
  { id: 1, type: 'Received', amount: 100, from: 'Alice', date: '2023-07-30' },
  { id: 2, type: 'Sent', amount: 50, to: 'Bob', date: '2023-07-29' },
  { id: 3, type: 'Charity', amount: 20, to: 'Save the Trees', date: '2023-07-28' },
  { id: 4, type: 'Received', amount: 200, from: 'Work', date: '2023-07-27' },
  { id: 5, type: 'Sent', amount: 30, to: 'Coffee Shop', date: '2023-07-26' },
]

export function MobileWalletDashboardComponent() {
  const [balance, setBalance] = useState(1000) // Initial balance in TCOIN
  const [qrTcoinAmount, setQrTcoinAmount] = useState('')
  const [qrCadAmount, setQrCadAmount] = useState('')
  const [tcoinAmount, setTcoinAmount] = useState('')
  const [cadAmount, setCadAmount] = useState('')
  const [showAmountInCad, setShowAmountInCad] = useState(false)
  const exchangeRate = 3.30 // 1 TCOIN = $3.30 CAD

  const convertToCad = (tcoin: number) => (tcoin * exchangeRate).toFixed(2)
  const convertToTcoin = (cad: number) => (cad / exchangeRate).toFixed(2)

  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>, setCadAmount: React.Dispatch<React.SetStateAction<string>>, setTcoinAmount: React.Dispatch<React.SetStateAction<string>>) => {
    const { name, value } = e.target
    if (name === 'tcoin') {
      setTcoinAmount(value)
      setCadAmount(convertToCad(Number(value)))
    } else {
      setCadAmount(value)
      setTcoinAmount(convertToTcoin(Number(value)))
    }
  }

  const handleQrAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    if (name === 'qrTcoin') {
      setQrTcoinAmount(value)
      setQrCadAmount(convertToCad(Number(value)))
    } else {
      setQrCadAmount(value)
      setQrTcoinAmount(convertToTcoin(Number(value)))
    }
  }

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
                <DialogDescription>
                  Use your device's camera to scan a QR code for payment.
                </DialogDescription>
              </DialogHeader>
              <div className="flex items-center justify-center h-64 bg-gray-100 rounded-md">
                Camera feed would appear here
              </div>
            </DialogContent>
          </Dialog>
          <Dialog>
            <DialogTrigger asChild>
              <Avatar>
                <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
                <AvatarFallback><User className="h-6 w-6" /></AvatarFallback>
              </Avatar>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>User Profile</DialogTitle>
                <DialogDescription>
                  Manage your account settings and preferences.
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4">
                <div className="flex items-center space-x-4 mb-4">
                  <Avatar className="w-20 h-20">
                    <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
                    <AvatarFallback><User className="h-12 w-12" /></AvatarFallback>
                  </Avatar>
                  <Button variant="link" className="p-0 h-auto" onClick={() => console.log('Change avatar')}>Change avatar</Button>
                </div>
                <p><strong>Name:</strong> John Doe</p>
                <p><strong>Email:</strong> john.doe@example.com</p>
                <Button className="w-full">Edit Profile</Button>
                <Button className="w-full" variant="outline">Log Out</Button>
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
              <p>My default charity: <strong>The FoodBank</strong> <Button variant="link" className="p-0 h-auto font-normal" onClick={() => console.log('Change charity')}>change</Button></p>
              <p>My contribution to The FoodBank: {charityData.personalContribution} TCOIN</p>
              <p>All users to The FoodBank: {charityData.allUsersToCharity} TCOIN</p>
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
              <Input 
                name="qrTcoin"
                value={qrTcoinAmount} 
                onChange={handleQrAmountChange}
                placeholder="Enter TCOIN amount" 
              />
              <Input 
                name="qrCad"
                value={qrCadAmount} 
                onChange={handleQrAmountChange}
                placeholder="Enter CAD amount" 
              />
              <Button onClick={() => {
                console.log('Update QR for', qrTcoinAmount, 'TCOIN');
                const qrTextElement = document.querySelector('.qr-code-text');
                if (qrTextElement) {
                  qrTextElement.textContent = `QR code for ${qrTcoinAmount} TCOIN`;
                }
              }} className="w-full">
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
                    <DialogDescription>
                      Select a contact to request TCOIN from.
                    </DialogDescription>
                  </DialogHeader>
                  <div className="space-y-4">
                    <Input placeholder="Search contacts..." />
                    <ul className="space-y-2">
                      <li><Button variant="ghost" className="w-full justify-start">Alice</Button></li>
                      <li><Button variant="ghost" className="w-full justify-start">Bob</Button></li>
                      <li><Button variant="ghost" className="w-full justify-start">Charlie</Button></li>
                    </ul>
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
                    <DialogDescription>
                      Share your QR code via different methods.
                    </DialogDescription>
                  </DialogHeader>
                  <div className="space-y-4">
                    <Button className="w-full">Share via Email</Button>
                    <Button className="w-full">Share via SMS</Button>
                    <Button className="w-full">Copy Link</Button>
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
                  <DialogDescription>
                    Use your device's camera to scan a QR code for payment.
                  </DialogDescription>
                </DialogHeader>
                <div className="flex items-center justify-center h-64 bg-gray-100 rounded-md">
                  Camera feed would appear here
                </div>
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
                  <DialogDescription>
                    Select a contact to send TCOIN to.
                  </DialogDescription>
                </DialogHeader>
                <div className="space-y-4">
                  <Input placeholder="Search contacts..." />
                  <ul className="space-y-2">
                    <li><Button variant="ghost" className="w-full justify-start">Alice</Button></li>
                    <li><Button variant="ghost" className="w-full justify-start">Bob</Button></li>
                    <li><Button variant="ghost" className="w-full justify-start">Charlie</Button></li>
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
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="graph">Graph</TabsTrigger>
                <TabsTrigger value="balance">Balance</TabsTrigger>
                <TabsTrigger value="transactions">Transactions</TabsTrigger>
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
                  <p className="text-4xl font-bold">{balance} TCOIN</p>
                  <p className="text-xl">{convertToCad(balance)} CAD</p>
                </div>
              </TabsContent>
              <TabsContent value="transactions">
                <div className="flex items-center space-x-2 mb-4">
                  <Switch
                    id="currency-toggle"
                    checked={showAmountInCad}
                    onCheckedChange={setShowAmountInCad}
                  />
                  <Label htmlFor="currency-toggle">
                    Show amounts in {showAmountInCad ? 'CAD' : 'TCOIN'}
                  </Label>
                </div>
                <ul className="space-y-2">
                  {recentTransactions.map(transaction => (
                    <li key={transaction.id} className="flex justify-between items-center">
                      <div>
                        <p className="font-semibold">{transaction.type}</p>
                        <p className="text-sm text-gray-500">
                          {transaction.from ? `From: ${transaction.from}` : `To: ${transaction.to}`}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className={`font-semibold ${transaction.type === 'Received' ? 'text-green-600' : 'text-red-600'}`}>
                          {transaction.type === 'Received' ? '+' : '-'}
                          
                          {showAmountInCad 
                            ? `$${convertToCad(transaction.amount)}`
                            : `${transaction.amount} TCOIN`
                          }
                        </p>
                        <p className="text-sm text-gray-500">
                          Charity: {showAmountInCad 
                            ? `$${(transaction.amount * 0.03 * exchangeRate).toFixed(2)}`
                            : `${(transaction.amount * 0.03).toFixed(2)} TCOIN`
                          }
                        </p>
                        <p className="text-sm text-gray-500">{transaction.date}</p>
                      </div>
                    </li>
                  ))}
                </ul>
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
                    <CreditCard className="mr-2 h-4 w-4" /> Top Up with Credit Card
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Top Up with Credit Card</DialogTitle>
                    <DialogDescription>
                      Enter your credit card details to top up your TCOIN balance.
                    </DialogDescription>
                  </DialogHeader>
                  <div className="space-y-4">
                    <Input placeholder="Card Number" />
                    <div className="flex space-x-2">
                      <Input placeholder="MM/YY" />
                      <Input placeholder="CVC" />
                    </div>
                    <Input placeholder="Amount in CAD" />
                    <Button className="w-full">Top Up</Button>
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
                    <DialogDescription>
                      Convert your TCOIN to CAD and transfer to your bank account.
                    </DialogDescription>
                  </DialogHeader>
                  <div className="space-y-4">
                    <Input placeholder="Amount in TCOIN" />
                    <p>Estimated CAD: $0.00</p>
                    <Input placeholder="Bank Account Number" />
                    <Button className="w-full">Convert and Transfer</Button>
                  </div>
                </DialogContent>
              </Dialog>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}