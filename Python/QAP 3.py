# Desc: Honest Harry Car Sales - Program that creates a receipt for car sales with a payment schedule
# Author: Lucas Hudon
# Dates: July 10th - July 20th

import datetime


# Define Constants

CUR_DATE = datetime.datetime.now()

LICENSE_FEE_STAN = 75.00  # Standard rate on cars up to 15000.00

LICENSE_FEE_OVER = 165.00  # Rate on cars over 15000.00

TRANSFER_FEE = .01  # 1% of selling price

LUXURY_TAX = .016  # Additional 1.6% added to transfer fee if selling price is over 20000.00

HST_RATE = .15  # Taxes at a rate of 15%


# Define Functions

def name_initial(Name):
    Initial = Name[0]

    return Initial

def plate_end(Plate):

    end = Plate[-3:]
    return end

def phone_end(Number):

    end = Number[-4:]
    return end

def phone_front(Number):

    front = Number[0:+3]
    return front

def phone_middle(Number):
    
    middle = int(len(Number)/2)
    return Number[middle-2:middle+1]


# Gather User Input

while True:
    
    print()
    FirstName = input("Enter customer first name (END to exit): ").title()
    if FirstName.upper() == "END":
        break
    
    LastName = input("Enter customer last name: ").title()

    while True:
        PhoneNum = input("Enter customer phone number (9999999999): ")
        if PhoneNum == "":
            print()
            print("Data Entry Error - Phone number cannot be blank")
            print()
        elif len(PhoneNum) != 10:
            print()
            print("Data Entry Error - Phone number must contain 10 digits")
            print()
        elif PhoneNum.isdigit() == False:
            print()
            print("Data Entry Error - Phone number must contain numbers only")
            print()
        else:
            break
    
    while True:
        PlateNum = input("Enter the plate number (XXX999): ").upper()
        if PlateNum == "":
            print()
            print("Data Entry Error - Plate number cannot be blank")
            print()
        elif len(PlateNum) != 6:
            print()
            print("Data Entry Error - Plate number must be 6 digits")
            print()
        else:
            break
    
    CarMake = input("Enter the car make: ").title()

    CarModel = input("Enter the car model: ").title()

    while True:
        Year = input("Enter the year (yyyy): ")
        if Year == "":
            print()
            print("Data Entry Error - Year cannot be blank")
            print()
        elif len(Year) != 4:
            print()
            print("Data Entry Error - Must be a valid year")
            print()
        elif Year.isdigit() == False:
            print()
            print("Data Entry Error - Year must contain numbers only")
            print()
        else:
            break

    while True:
        try:
            SellPrice = input("Enter the selling price: ")
            SellPrice = float(SellPrice)
        except:
            print()
            print("Data Entry Error - Contains invalid characters")
            print()
        else:
            if SellPrice > 50000.00:
                print()
                print("Data Entry Error - Cannot exceed 50000.00")
                print()
            else:
                break
    SellPriceDsp = "${:,.2f}".format(SellPrice)
    
    while True:
        try:
            TradeIn = input("Enter the amount of the trade in: ")
            TradeIn = float(TradeIn)
        except:
            print()
            print("Data Entry Error - Contains invalid characters")
            print()
        else:
            if TradeIn > SellPrice:
                print()
                print("Data Entry Error - Cannot exceed the selling price")
                print()
            else:
                break
    TradeInDsp = "${:,.2f}".format(TradeIn)

    SalespersonName = input("Enter the salesperson's name: ").title()
    

    # Perform Program Calculations

    InvoiceDate = CUR_DATE
    InvoiceDateDsp = InvoiceDate.strftime("%b %d, %Y")

    CustName = (f"{name_initial(FirstName)}, {LastName}")

    CustPhone = (f"({phone_front(PhoneNum)}) {phone_middle(PhoneNum)}-{phone_end(PhoneNum)}")

    CarDetails = (f"{Year} {CarMake} {CarModel}")

    ReceiptID = (f"{name_initial(FirstName)}{name_initial(LastName)}-{plate_end(PlateNum)}-{phone_end(PhoneNum)}")
    
    AfterTrade = SellPrice - TradeIn
    AfterTradeDsp = "${:,.2f}".format(AfterTrade)

    if SellPrice <= 15000.00:
        LicenseFee = LICENSE_FEE_STAN
    else:
        LicenseFee = LICENSE_FEE_OVER
    LicenseFeeDsp = "${:,.2f}".format(LicenseFee)

    TransferFee = SellPrice * TRANSFER_FEE
    
    LuxuryTax = SellPrice * LUXURY_TAX

    if SellPrice > 20000.00:
        TotalTransFee = TransferFee + LuxuryTax
    else:
        TotalTransFee = TransferFee
    TotalTransFeeDsp = "${:,.2f}".format(TotalTransFee)

    Subtotal = AfterTrade + LicenseFee + TotalTransFee
    SubtotalDsp = "${:,.2f}".format(Subtotal)

    HST = Subtotal + HST_RATE
    HSTDsp = "${:,.2f}".format(HST)

    TotalSalesPrice = Subtotal + HST
    TotalSalesPriceDsp = "${:,.2f}".format(TotalSalesPrice)

    FirstOfMonth = (CUR_DATE.replace(day=1) + datetime.timedelta(days=32)).replace(day=1)


    # Display Program Calculations

    print()
    print("         1         2         3         4         5         6         7         8")
    print("12345678901234567890123456789012345678901234567890123456789012345678901234567890")

    print()
    print(f"Honest Harry Car Sales                             Invoice Date:   {InvoiceDateDsp}")
    print(f"Used Car Sale and Receipt                          Receipt No:      {ReceiptID}")
    print()
    print(f"                                             Sale Price:             {SellPriceDsp:>10s}")
    print(f"Sold to:                                     Trade Allowance         {TradeInDsp:>10s}")
    print("                                             ----------------------------------") 
    print(f"      {CustName:<30s}         Price After Trade:      {AfterTradeDsp:>10s}")
    print(F"      {CustPhone}                         License Fee:            {LicenseFeeDsp:>10s}")  
    print(f"                                             Transfer Fee:           {TotalTransFeeDsp:>10s}")
    print("                                             ----------------------------------")
    print(f"Car Details:                                 SubTotal:               {SubtotalDsp:>10s}")
    print(f"                                             HST:                    {HSTDsp:>10s}")
    print(f"      {CarDetails:<30s}         ----------------------------------")
    print(f"                                             Total Sales Price:      {TotalSalesPriceDsp:>10s}")
    print()
    print("-------------------------------------------------------------------------------")
    print()
    print("                                   Financing      Total         Monthly")
    print("       # Years     # Payments         Fee         Price         Payment")
    print("       ----------------------------------------------------------------")

    for i in range(1, 5):

        Years = 1 * i

        Months = Years * 12

        FinanceFee = 39.99 * Years
        FinanceFeeDsp = "${:,.2f}".format(FinanceFee)

        TotalPrice = TotalSalesPrice + FinanceFee
        TotalPriceDsp = "${:,.2f}".format(TotalPrice)

        MonthlyPay = TotalPrice/Months
        MonthlyPayDsp = "${:,.2f}".format(MonthlyPay)
        print(f"           {Years}           {Months}         {FinanceFeeDsp:>9s}     {TotalPriceDsp:>10s}    {MonthlyPayDsp:>9s}")
    print("       ----------------------------------------------------------------")
    print("       First payment date:", FirstOfMonth.strftime("%d-%b-%y"))
    print("-------------------------------------------------------------------------------")
    print("                       Best used cars at the best prices!")