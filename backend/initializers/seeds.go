package initializers

import (
	"log"
	"github.com/Eric-Cortez/Carra/models"
	"golang.org/x/crypto/bcrypt"
)


func SeedDatabase() {
	seedUsers()
	seedTopics()
	seedQuestions()
	seedAnswers()
	seedVotes()
}

func seedUsers() {
	password := "demo"
	hashedPassword, err := bcrypt.GenerateFromPassword([]byte(password), bcrypt.DefaultCost)
	if err != nil {
		log.Fatal("Failed to hash password:", err)
	}

	users := []models.User{
		{Username: "demo", Email: "demo@gmail.com", HashedPassword: string(hashedPassword)},
		{Username: "demo1", Email: "demo1@gmail.com", HashedPassword: string(hashedPassword)},
		{Username: "demo2", Email: "demo2@gmail.com", HashedPassword: string(hashedPassword)},
		{Username: "demo3", Email: "demo3@gmail.com", HashedPassword: string(hashedPassword)},
		{Username: "demo4", Email: "demo4@gmail.com", HashedPassword: string(hashedPassword)},
		{Username: "demo5", Email: "demo5@gmail.com", HashedPassword: string(hashedPassword)},
		{Username: "carguyjoe", Email: "carguyjoe@gmail.com", HashedPassword: string(hashedPassword)},
		{Username: "racerchick", Email: "racerchick@gmail.com", HashedPassword: string(hashedPassword)},
		{Username: "autoengineer", Email: "autoengineer@gmail.com", HashedPassword: string(hashedPassword)},
		{Username: "vintagecollector", Email: "vintagecollector@gmail.com", HashedPassword: string(hashedPassword)},
		{Username: "ecodriver", Email: "ecodriver@gmail.com", HashedPassword: string(hashedPassword)},
		{Username: "driftking", Email: "driftking@gmail.com", HashedPassword: string(hashedPassword)},
		{Username: "gearhead", Email: "gearhead@gmail.com", HashedPassword: string(hashedPassword)},
		{Username: "autocrosser", Email: "autocrosser@gmail.com", HashedPassword: string(hashedPassword)},
		{Username: "detailpro", Email: "detailpro@gmail.com", HashedPassword: string(hashedPassword)},
		{Username: "turbonerd", Email: "turbonerd@gmail.com", HashedPassword: string(hashedPassword)},
		{Username: "luxurydriver", Email: "luxurydriver@gmail.com", HashedPassword: string(hashedPassword)},
		{Username: "familywheels", Email: "familywheels@gmail.com", HashedPassword: string(hashedPassword)},
		{Username: "budgetmechanic", Email: "budgetmechanic@gmail.com", HashedPassword: string(hashedPassword)},
		{Username: "motorcyclist", Email: "motorcyclist@gmail.com", HashedPassword: string(hashedPassword)},
		{Username: "cartester", Email: "cartester@gmail.com", HashedPassword: string(hashedPassword)},
		{Username: "rallyfan", Email: "rallyfan@gmail.com", HashedPassword: string(hashedPassword)},
		{Username: "minicooper", Email: "minicooper@gmail.com", HashedPassword: string(hashedPassword)},
		{Username: "jdmlover", Email: "jdmlover@gmail.com", HashedPassword: string(hashedPassword)},
		{Username: "cardesigner", Email: "cardesigner@gmail.com", HashedPassword: string(hashedPassword)},
		{Username: "audiexpert", Email: "audiexpert@gmail.com", HashedPassword: string(hashedPassword)},
		{Username: "trucklover", Email: "trucklover@gmail.com", HashedPassword: string(hashedPassword)},
		{Username: "tireman", Email: "tireman@gmail.com", HashedPassword: string(hashedPassword)},
		{Username: "classiccars", Email: "classiccars@gmail.com", HashedPassword: string(hashedPassword)},
		{Username: "futurecars", Email: "futurecars@gmail.com", HashedPassword: string(hashedPassword)},
	}
	for _, user := range users {
		DB.FirstOrCreate(&user, models.User{Email: user.Email})
	}
}

func seedTopics() {
	var users []models.User
	DB.Find(&users)

	emailToID := map[string]uint{}
	for _, user := range users {
		emailToID[user.Email] = user.ID
	}

	topics := []models.Topic{
		{Name: "Tesla", UserID: emailToID["demo@gmail.com"]},
		{Name: "Electric Cars", UserID: emailToID["demo1@gmail.com"]},
		{Name: "Muscle Cars", UserID: emailToID["demo2@gmail.com"]},
		{Name: "Car Mods", UserID: emailToID["demo3@gmail.com"]},
		{Name: "Self-Driving Tech", UserID: emailToID["demo4@gmail.com"]},
		{Name: "Supercars", UserID: emailToID["demo5@gmail.com"]},
		{Name: "Ford", UserID: emailToID["demo@gmail.com"]},
		{Name: "Off-Roading", UserID: emailToID["demo1@gmail.com"]},
		{Name: "DIY Car Fixes", UserID: emailToID["demo2@gmail.com"]},
		{Name: "Used Cars", UserID: emailToID["demo3@gmail.com"]},
		{Name: "F1 Racing", UserID: emailToID["demo4@gmail.com"]},
		{Name: "Car Design", UserID: emailToID["demo5@gmail.com"]},
		{Name: "Toyota", UserID: emailToID["carguyjoe@gmail.com"]},
		{Name: "Chevrolet", UserID: emailToID["racerchick@gmail.com"]},
		{Name: "BMW", UserID: emailToID["autoengineer@gmail.com"]},
		{Name: "Classic Cars", UserID: emailToID["vintagecollector@gmail.com"]},
		{Name: "Hybrid Vehicles", UserID: emailToID["ecodriver@gmail.com"]},
		{Name: "JDM Cars", UserID: emailToID["driftking@gmail.com"]},
		{Name: "Transmissions", UserID: emailToID["gearhead@gmail.com"]},
		{Name: "Car Handling", UserID: emailToID["autocrosser@gmail.com"]},
		{Name: "Car Detailing", UserID: emailToID["detailpro@gmail.com"]},
		{Name: "Turbochargers", UserID: emailToID["turbonerd@gmail.com"]},
		{Name: "Luxury Cars", UserID: emailToID["luxurydriver@gmail.com"]},
		{Name: "Family Vehicles", UserID: emailToID["familywheels@gmail.com"]},
		{Name: "Budget Cars", UserID: emailToID["budgetmechanic@gmail.com"]},
		{Name: "Motorcycles", UserID: emailToID["motorcyclist@gmail.com"]},
		{Name: "Car Reviews", UserID: emailToID["cartester@gmail.com"]},
		{Name: "Rally Racing", UserID: emailToID["rallyfan@gmail.com"]},
		{Name: "Mini Cooper", UserID: emailToID["minicooper@gmail.com"]},
		{Name: "Honda", UserID: emailToID["jdmlover@gmail.com"]},
		{Name: "Car Interiors", UserID: emailToID["cardesigner@gmail.com"]},
		{Name: "Car Audio", UserID: emailToID["audiexpert@gmail.com"]},
		{Name: "Pickup Trucks", UserID: emailToID["trucklover@gmail.com"]},
		{Name: "Tires & Wheels", UserID: emailToID["tireman@gmail.com"]},
		{Name: "Vintage Cars", UserID: emailToID["classiccars@gmail.com"]},
		{Name: "Concept Cars", UserID: emailToID["futurecars@gmail.com"]},
		{Name: "Mercedes-Benz", UserID: emailToID["luxurydriver@gmail.com"]},
		{Name: "Audi", UserID: emailToID["audiexpert@gmail.com"]},
		{Name: "Jeep", UserID: emailToID["demo1@gmail.com"]},
		{Name: "Dodge", UserID: emailToID["demo2@gmail.com"]},
		{Name: "Subaru", UserID: emailToID["rallyfan@gmail.com"]},
		{Name: "Volkswagen", UserID: emailToID["autoengineer@gmail.com"]},
		{Name: "Porsche", UserID: emailToID["luxurydriver@gmail.com"]},
		{Name: "Car Maintenance", UserID: emailToID["carguyjoe@gmail.com"]},
		{Name: "Engine Swaps", UserID: emailToID["demo3@gmail.com"]},
		{Name: "Car Insurance", UserID: emailToID["familywheels@gmail.com"]},
		{Name: "Track Days", UserID: emailToID["autocrosser@gmail.com"]},
		{Name: "Driving Skills", UserID: emailToID["racerchick@gmail.com"]},
		{Name: "Car Paint", UserID: emailToID["detailpro@gmail.com"]},
		{Name: "Car Leasing", UserID: emailToID["budgetmechanic@gmail.com"]},
	}

	for _, topic := range topics {
			DB.FirstOrCreate(&topic, models.Topic{Name: topic.Name})
		}
	}


	func seedQuestions() {
		var users []models.User
		DB.Find(&users)

		var topics []models.Topic
		DB.Find(&topics)

		emailToID := map[string]uint{}
		for _, user := range users {
			emailToID[user.Email] = user.ID
		}

		topicNameToID := map[string]uint{}
		for _, topic := range topics {
			topicNameToID[topic.Name] = topic.ID
		}

		questions := []models.Question{
			{Title: "What are the benefits of electric cars?", Content: "I'd love to know why people are switching to electric cars.", UserID: emailToID["demo1@gmail.com"], TopicID: topicNameToID["Electric Cars"]},
			{Title: "Best muscle cars for 2023", Content: "What are the top muscle cars for this year?", UserID: emailToID["demo2@gmail.com"], TopicID: topicNameToID["Muscle Cars"]},
			{Title: "How to upgrade a car's performance?", Content: "What are some easy ways to boost the performance of my car?", UserID: emailToID["demo3@gmail.com"], TopicID: topicNameToID["Car Mods"]},
			{Title: "What is self-driving tech?", Content: "Can anyone explain how self-driving cars work?", UserID: emailToID["demo4@gmail.com"], TopicID: topicNameToID["Self-Driving Tech"]},
			{Title: "What makes a car a supercar?", Content: "What defines a supercar, and how is it different from a regular sports car?", UserID: emailToID["demo5@gmail.com"], TopicID: topicNameToID["Supercars"]},
			{Title: "What are the best cars for off-roading?", Content: "What vehicles are best suited for off-roading adventures?", UserID: emailToID["demo1@gmail.com"], TopicID: topicNameToID["Off-Roading"]},
			{Title: "How do I fix a leaky car tire?", Content: "Can anyone suggest the best way to fix a leaky car tire on the go?", UserID: emailToID["demo2@gmail.com"], TopicID: topicNameToID["DIY Car Fixes"]},
			{Title: "What are the pros and cons of used cars?", Content: "What should I look out for when buying a used car?", UserID: emailToID["demo3@gmail.com"], TopicID: topicNameToID["Used Cars"]},
			{Title: "Is it worth getting a Ford Mustang?", Content: "What do you think of the Ford Mustang as a first muscle car?", UserID: emailToID["demo4@gmail.com"], TopicID: topicNameToID["Ford"]},
			{Title: "What's the future of autonomous vehicles?", Content: "How far are we from fully autonomous vehicles being common on the road?", UserID: emailToID["demo5@gmail.com"], TopicID: topicNameToID["Self-Driving Tech"]},
			{Title: "What is the best Tesla model?", Content: "What is the best Tesla model for a first-time buyer?", UserID: emailToID["demo@gmail.com"], TopicID: topicNameToID["Tesla"]},
			{Title: "How reliable are Ford vehicles?", Content: "How reliable are Ford cars compared to other brands?", UserID: emailToID["demo@gmail.com"], TopicID: topicNameToID["Ford"]},
			{Title: "How do I get into F1 racing?", Content: "What's the best way to get involved in F1 racing as a beginner?", UserID: emailToID["demo1@gmail.com"], TopicID: topicNameToID["F1 Racing"]},
			{Title: "What makes a car a classic?", Content: "What criteria makes a car 'classic'? How old does a car need to be?", UserID: emailToID["demo2@gmail.com"], TopicID: topicNameToID["Car Design"]},
			{Title: "How do car modifications affect insurance?", Content: "Will modifying my car impact my car insurance rates?", UserID: emailToID["demo3@gmail.com"], TopicID: topicNameToID["Car Mods"]},
			{Title: "What's the best SUV for family road trips?", Content: "Can anyone recommend an SUV that's great for long family road trips?", UserID: emailToID["demo4@gmail.com"], TopicID: topicNameToID["Used Cars"]},
			{Title: "Electric Cars vs Gas Cars", Content: "Which is better, electric or gas cars, in terms of performance and cost?", UserID: emailToID["demo5@gmail.com"], TopicID: topicNameToID["Electric Cars"]},
			{Title: "Is off-roading safe for beginners?", Content: "I'm new to off-roading. What are the safety precautions I should take?", UserID: emailToID["demo1@gmail.com"], TopicID: topicNameToID["Off-Roading"]},
			{Title: "How can I make my car faster?", Content: "I want to increase my car's speed. What are the best mods for performance?", UserID: emailToID["demo2@gmail.com"], TopicID: topicNameToID["Car Mods"]},
			{Title: "How to get started with car restoration?", Content: "What are some good resources for getting into car restoration projects?", UserID: emailToID["demo3@gmail.com"], TopicID: topicNameToID["DIY Car Fixes"]},
			{Title: "What's the best car for snow driving?", Content: "What are some of the best vehicles for driving in snowy conditions?", UserID: emailToID["demo4@gmail.com"], TopicID: topicNameToID["Off-Roading"]},
			{Title: "Is electric car charging expensive?", Content: "How much does it typically cost to charge an electric vehicle at home?", UserID: emailToID["demo5@gmail.com"], TopicID: topicNameToID["Electric Cars"]},
			{Title: "Best Toyota models for reliability", Content: "Which Toyota models are known for being the most reliable and long-lasting?", UserID: emailToID["carguyjoe@gmail.com"], TopicID: topicNameToID["Toyota"]},
			{Title: "Chevy Corvette vs Camaro", Content: "How do the Corvette and Camaro compare in terms of performance and value?", UserID: emailToID["racerchick@gmail.com"], TopicID: topicNameToID["Chevrolet"]},
			{Title: "BMW maintenance costs", Content: "Are BMWs really expensive to maintain? What should I budget for annual maintenance?", UserID: emailToID["autoengineer@gmail.com"], TopicID: topicNameToID["BMW"]},
			{Title: "Best classic cars to restore", Content: "What are some good classic cars for a first-time restoration project?", UserID: emailToID["vintagecollector@gmail.com"], TopicID: topicNameToID["Classic Cars"]},
			{Title: "Toyota Prius vs Honda Insight", Content: "How do these popular hybrid models compare in fuel efficiency and features?", UserID: emailToID["ecodriver@gmail.com"], TopicID: topicNameToID["Hybrid Vehicles"]},
			{Title: "Importing JDM cars to USA", Content: "What's the process for importing a Japanese domestic market car to the United States?", UserID: emailToID["driftking@gmail.com"], TopicID: topicNameToID["JDM Cars"]},
			{Title: "Manual vs Automatic transmission", Content: "What are the pros and cons of manual vs automatic transmissions for everyday driving?", UserID: emailToID["gearhead@gmail.com"], TopicID: topicNameToID["Transmissions"]},
			{Title: "How to improve car handling", Content: "What modifications can I make to improve my car's cornering and overall handling?", UserID: emailToID["autocrosser@gmail.com"], TopicID: topicNameToID["Car Handling"]},
			{Title: "Best products for ceramic coating", Content: "What are the best DIY ceramic coating products for protecting car paint?", UserID: emailToID["detailpro@gmail.com"], TopicID: topicNameToID["Car Detailing"]},
			{Title: "Single vs Twin turbo setups", Content: "What are the differences between single and twin turbo setups? Which is better for daily driving?", UserID: emailToID["turbonerd@gmail.com"], TopicID: topicNameToID["Turbochargers"]},
			{Title: "Mercedes S-Class vs BMW 7 Series", Content: "How do these luxury flagship sedans compare in terms of comfort and technology?", UserID: emailToID["luxurydriver@gmail.com"], TopicID: topicNameToID["Luxury Cars"]},
			{Title: "Best car seats for infants", Content: "What are the safest and most comfortable car seats for newborns?", UserID: emailToID["familywheels@gmail.com"], TopicID: topicNameToID["Family Vehicles"]},
			{Title: "Reliable cars under $5,000", Content: "What are some reliable used cars I can find for under $5,000?", UserID: emailToID["budgetmechanic@gmail.com"], TopicID: topicNameToID["Budget Cars"]},
			{Title: "Best cars for motorcycle enthusiasts", Content: "As a motorcycle lover, what cars might I enjoy driving when I can't ride my bike?", UserID: emailToID["motorcyclist@gmail.com"], TopicID: topicNameToID["Car Reviews"]},
			{Title: "Understanding rally car setups", Content: "How are rally cars set up differently from regular road cars?", UserID: emailToID["rallyfan@gmail.com"], TopicID: topicNameToID["Rally Racing"]},
			{Title: "Mini Cooper reliability issues", Content: "What are common problems with Mini Coopers? Are they expensive to fix?", UserID: emailToID["minicooper@gmail.com"], TopicID: topicNameToID["Mini Cooper"]},
			{Title: "Honda Civic Type R vs Si", Content: "How does the Civic Type R compare to the Si in terms of performance and daily drivability?", UserID: emailToID["jdmlover@gmail.com"], TopicID: topicNameToID["Honda"]},
			{Title: "Best car interior materials", Content: "What are the most durable and luxurious materials for car interiors?", UserID: emailToID["cardesigner@gmail.com"], TopicID: topicNameToID["Car Interiors"]},
			{Title: "Upgrading factory car speakers", Content: "What's the best way to upgrade factory car speakers for better sound quality?", UserID: emailToID["audiexpert@gmail.com"], TopicID: topicNameToID["Car Audio"]},
			{Title: "Ford F-150 vs Chevy Silverado", Content: "How do these popular pickup trucks compare in terms of capability and features?", UserID: emailToID["trucklover@gmail.com"], TopicID: topicNameToID["Pickup Trucks"]},
			{Title: "All-season vs winter tires", Content: "Do I really need winter tires or are all-season tires good enough for mild winters?", UserID: emailToID["tireman@gmail.com"], TopicID: topicNameToID["Tires & Wheels"]},
			{Title: "Most valuable vintage cars", Content: "Which vintage cars tend to appreciate in value the most over time?", UserID: emailToID["classiccars@gmail.com"], TopicID: topicNameToID["Vintage Cars"]},
			{Title: "Will flying cars ever be real?", Content: "Are flying cars a realistic possibility for the future or just science fiction?", UserID: emailToID["futurecars@gmail.com"], TopicID: topicNameToID["Concept Cars"]},
			{Title: "Maintaining a Mercedes out of warranty", Content: "How expensive is it to maintain a Mercedes-Benz after the warranty expires?", UserID: emailToID["luxurydriver@gmail.com"], TopicID: topicNameToID["Mercedes-Benz"]},
			{Title: "Audi Quattro system explained", Content: "How does Audi's Quattro all-wheel drive system work and what makes it special?", UserID: emailToID["audiexpert@gmail.com"], TopicID: topicNameToID["Audi"]},
			{Title: "Jeep Wrangler vs Toyota 4Runner", Content: "Which is better for serious off-roading, the Jeep Wrangler or Toyota 4Runner?", UserID: emailToID["demo1@gmail.com"], TopicID: topicNameToID["Jeep"]},
			{Title: "Dodge Challenger Hellcat review", Content: "Is the Hellcat worth the premium over the regular Challenger? How is it to drive daily?", UserID: emailToID["demo2@gmail.com"], TopicID: topicNameToID["Dodge"]},
			{Title: "Best Subaru for mountain driving", Content: "Which Subaru model handles best on mountain roads and in snowy conditions?", UserID: emailToID["rallyfan@gmail.com"], TopicID: topicNameToID["Subaru"]},
			{Title: "VW GTI vs Golf R", Content: "Is the Golf R worth the extra cost over the GTI? What are the main differences?", UserID: emailToID["autoengineer@gmail.com"], TopicID: topicNameToID["Volkswagen"]},
			{Title: "Porsche 911 vs Cayman", Content: "How does the Cayman compare to the 911 in terms of driving experience? Is it a 'real' Porsche?", UserID: emailToID["luxurydriver@gmail.com"], TopicID: topicNameToID["Porsche"]},
			{Title: "How often should I change my oil?", Content: "Is the 3,000 mile oil change rule still relevant with modern cars?", UserID: emailToID["carguyjoe@gmail.com"], TopicID: topicNameToID["Car Maintenance"]},
			{Title: "LS swap compatibility", Content: "Which cars are easiest to perform an LS engine swap on?", UserID: emailToID["demo3@gmail.com"], TopicID: topicNameToID["Engine Swaps"]},
			{Title: "How car modifications affect insurance", Content: "Which mods increase insurance rates the most? Are some mods insurance-friendly?", UserID: emailToID["familywheels@gmail.com"], TopicID: topicNameToID["Car Insurance"]},
			{Title: "First track day advice", Content: "I'm taking my car to the track for the first time. What should I know and prepare for?", UserID: emailToID["autocrosser@gmail.com"], TopicID: topicNameToID["Track Days"]},
			{Title: "Advanced driving techniques", Content: "What are some advanced driving techniques that can make me safer on the road?", UserID: emailToID["racerchick@gmail.com"], TopicID: topicNameToID["Driving Skills"]},
			{Title: "Single stage vs base/clear paint", Content: "What's the difference between single stage and base/clear paint systems?", UserID: emailToID["detailpro@gmail.com"], TopicID: topicNameToID["Car Paint"]},
			{Title: "Lease vs Buy analysis", Content: "Under what circumstances is leasing a car better than buying outright?", UserID: emailToID["budgetmechanic@gmail.com"], TopicID: topicNameToID["Car Leasing"]},
			{Title: "Tesla Supercharger network expansion", Content: "How extensive is the Tesla Supercharger network now? Is it enough for road trips?", UserID: emailToID["demo@gmail.com"], TopicID: topicNameToID["Tesla"]},
			{Title: "Electric truck towing capacity", Content: "How does the towing capacity of electric trucks like the F-150 Lightning compare to gas models?", UserID: emailToID["trucklover@gmail.com"], TopicID: topicNameToID["Electric Cars"]},
			{Title: "Classic Mustang restoration tips", Content: "What are some tips for restoring a classic 1960s Ford Mustang?", UserID: emailToID["vintagecollector@gmail.com"], TopicID: topicNameToID["Ford"]},
			{Title: "JDM Nissan Skyline legality", Content: "Which years of Nissan Skyline are now legal to import into the US?", UserID: emailToID["jdmlover@gmail.com"], TopicID: topicNameToID["JDM Cars"]},
			{Title: "Autocross vs Track Days", Content: "What are the main differences between autocross events and track days?", UserID: emailToID["autocrosser@gmail.com"], TopicID: topicNameToID["Car Handling"]},
			{Title: "BMW M3 generations compared", Content: "How do the different generations of BMW M3 compare? Which is most collectible?", UserID: emailToID["autoengineer@gmail.com"], TopicID: topicNameToID["BMW"]},
			{Title: "Best affordable sports cars", Content: "What are the best sports cars available for under $40,000?", UserID: emailToID["cartester@gmail.com"], TopicID: topicNameToID["Car Reviews"]},
			{Title: "DIY paint correction techniques", Content: "What's the proper technique for correcting minor paint scratches and swirls?", UserID: emailToID["detailpro@gmail.com"], TopicID: topicNameToID["Car Detailing"]},
			{Title: "How to read tire sidewall markings", Content: "What do all those numbers and letters on tire sidewalls mean?", UserID: emailToID["tireman@gmail.com"], TopicID: topicNameToID["Tires & Wheels"]},
			{Title: "Mercedes AMG vs BMW M", Content: "How do Mercedes AMG models compare to BMW M models in performance and luxury?", UserID: emailToID["luxurydriver@gmail.com"], TopicID: topicNameToID["Luxury Cars"]},
			{Title: "Hybrid SUVs with best MPG", Content: "Which hybrid SUVs offer the best fuel economy while still providing good space?", UserID: emailToID["ecodriver@gmail.com"], TopicID: topicNameToID["Hybrid Vehicles"]},
			{Title: "Turbo lag explained", Content: "What causes turbo lag and what can be done to minimize it?", UserID: emailToID["turbonerd@gmail.com"], TopicID: topicNameToID["Turbochargers"]},
			{Title: "Best cars for tall drivers", Content: "Which cars offer the most comfortable space for drivers over 6'3\"?", UserID: emailToID["familywheels@gmail.com"], TopicID: topicNameToID["Family Vehicles"]},
			{Title: "Are Jeeps really good off-road?", Content: "Do Jeeps live up to their off-road reputation or is it mostly marketing?", UserID: emailToID["demo1@gmail.com"], TopicID: topicNameToID["Jeep"]},
			{Title: "What's the best F1 race to attend?", Content: "If I could only attend one F1 race in my lifetime, which one should it be?", UserID: emailToID["racerchick@gmail.com"], TopicID: topicNameToID["F1 Racing"]},
			{Title: "Restoring vintage car upholstery", Content: "What are the best practices for restoring vintage car interior upholstery?", UserID: emailToID["vintagecollector@gmail.com"], TopicID: topicNameToID["Classic Cars"]},
			{Title: "Future of hydrogen fuel cell cars", Content: "Do hydrogen fuel cell vehicles have a future or will battery electric win out?", UserID: emailToID["futurecars@gmail.com"], TopicID: topicNameToID["Electric Cars"]},
			{Title: "Diagnose engine knocking sounds", Content: "What causes knocking sounds in an engine and how serious is it?", UserID: emailToID["carguyjoe@gmail.com"], TopicID: topicNameToID["DIY Car Fixes"]},
			{Title: "Caring for convertible tops", Content: "What's the best way to maintain and clean different types of convertible tops?", UserID: emailToID["detailpro@gmail.com"], TopicID: topicNameToID["Car Maintenance"]},
			{Title: "DIY window tinting guide", Content: "Can I tint my car windows myself? What supplies do I need?", UserID: emailToID["budgetmechanic@gmail.com"], TopicID: topicNameToID["Car Mods"]},
			{Title: "Ford Bronco vs Jeep Wrangler", Content: "How does the new Ford Bronco compare to the Jeep Wrangler for off-roading?", UserID: emailToID["demo1@gmail.com"], TopicID: topicNameToID["Off-Roading"]},
			{Title: "Pros and cons of lowering your car", Content: "What are the benefits and drawbacks of lowering your car's suspension?", UserID: emailToID["demo3@gmail.com"], TopicID: topicNameToID["Car Mods"]},
			{Title: "Installing car seat correctly", Content: "What are the key steps to ensure a car seat is installed correctly?", UserID: emailToID["familywheels@gmail.com"], TopicID: topicNameToID["Family Vehicles"]},
			{Title: "Best dash cams 2023", Content: "What are the best dash cams for front and rear recording?", UserID: emailToID["cartester@gmail.com"], TopicID: topicNameToID["Car Reviews"]},
			{Title: "Car buying negotiation tips", Content: "What are some effective negotiation strategies when buying a car from a dealership?", UserID: emailToID["budgetmechanic@gmail.com"], TopicID: topicNameToID["Used Cars"]},
			{Title: "Are Porsche 911s reliable?", Content: "How reliable are Porsche 911s compared to other sports cars? What are common issues?", UserID: emailToID["luxurydriver@gmail.com"], TopicID: topicNameToID["Porsche"]},
			{Title: "Why do diesel engines last longer?", Content: "What makes diesel engines typically last longer than gasoline engines?", UserID: emailToID["autoengineer@gmail.com"], TopicID: topicNameToID["Car Maintenance"]},
			{Title: "Best automotive YouTube channels", Content: "What are some educational and entertaining car-related YouTube channels to follow?", UserID: emailToID["cartester@gmail.com"], TopicID: topicNameToID["Car Reviews"]},
			{Title: "Ceramic vs conventional brakes", Content: "Are ceramic brakes worth the extra cost? What are the advantages?", UserID: emailToID["autoengineer@gmail.com"], TopicID: topicNameToID["Car Mods"]},
		}

		for _, question := range questions {
			DB.FirstOrCreate(&question, models.Question{Title: question.Title})
		}
	}


	func seedAnswers() {
		var users []models.User
		DB.Find(&users)

		var questions []models.Question
		DB.Find(&questions)

		emailToID := map[string]uint{}
		for _, user := range users {
			emailToID[user.Email] = user.ID
		}

		questionTitleToID := map[string]uint{}
		for _, question := range questions {
			questionTitleToID[question.Title] = question.ID
		}

		answers := []models.Answer{
			{Content: "Electric cars are great for the environment and can save you money on fuel in the long run. They are also cheaper to maintain than traditional cars.", UserID: emailToID["demo@gmail.com"], QuestionID: questionTitleToID["What are the benefits of electric cars?"],},
			{Content: "Some of the best muscle cars for 2023 are the Ford Mustang, Dodge Charger, and Chevrolet Camaro. Each offers a great blend of performance and style.", UserID: emailToID["demo2@gmail.com"], QuestionID: questionTitleToID["Best muscle cars for 2023"],},
			{Content: "To upgrade your car's performance, you can start with simple mods like a cold air intake, performance exhaust, or a tune. These can give you noticeable gains.", UserID: emailToID["demo3@gmail.com"], QuestionID: questionTitleToID["How to upgrade a car's performance?"],},
			{Content: "Self-driving tech uses a combination of sensors, cameras, and machine learning to navigate a vehicle without human input. It's a rapidly evolving technology with a lot of potential.", UserID: emailToID["demo4@gmail.com"], QuestionID: questionTitleToID["What is self-driving tech?"],},
			{Content: "A supercar is typically a high-performance vehicle with exceptional speed, design, and engineering. Examples include the Ferrari LaFerrari, McLaren P1, and Lamborghini Aventador.", UserID: emailToID["demo5@gmail.com"], QuestionID: questionTitleToID["What makes a car a supercar?"],},
			{Content: "The Ford Mustang is a classic American muscle car with strong performance. If you're a fan of powerful engines and a bold design, the Mustang is a great choice.", UserID: emailToID["demo4@gmail.com"], QuestionID: questionTitleToID["Is it worth getting a Ford Mustang?"],},
			{Content: "For a leaky tire, you can either patch it with a tire repair kit or take it to a mechanic for a more permanent solution. It's a good idea to check the tire regularly for any other issues.", UserID: emailToID["demo2@gmail.com"], QuestionID: questionTitleToID["How do I fix a leaky car tire?"],},
			{Content: "When buying a used car, always inspect the vehicle history report, check for any signs of accidents, and take it for a test drive to ensure everything works properly.", UserID: emailToID["demo3@gmail.com"], QuestionID: questionTitleToID["What are the pros and cons of used cars?"],},
			{Content: "For off-roading, you'll want a vehicle with high ground clearance and all-terrain tires. Popular options include the Jeep Wrangler and the Toyota Land Cruiser.", UserID: emailToID["demo1@gmail.com"], QuestionID: questionTitleToID["What are the best cars for off-roading?"],},
			{Content: "For snow driving, vehicles with all-wheel drive (AWD) or four-wheel drive (4WD) are the best. Consider cars like the Subaru Outback, Audi Q5, or Jeep Cherokee.", UserID: emailToID["demo4@gmail.com"], QuestionID: questionTitleToID["What's the best car for snow driving?"],},
			{Content: "Ford vehicles are generally reliable, with the F-150 and Ford Escape being especially popular for their long-term durability. However, maintenance costs can vary depending on the model.", UserID: emailToID["demo@gmail.com"], QuestionID: questionTitleToID["How reliable are Ford vehicles?"],},
			{Content: "The Tesla Model 3 is an excellent choice for first-time buyers due to its affordability and impressive range. If you're looking for a luxury option, the Model S is a top-tier pick.", UserID: emailToID["demo@gmail.com"], QuestionID: questionTitleToID["What is the best Tesla model?"],},
			{Content: "Electric cars offer lower operational costs, but gas cars can provide more range and refuel quickly. It really depends on your driving habits and preferences.", UserID: emailToID["demo5@gmail.com"], QuestionID: questionTitleToID["Electric Cars vs Gas Cars"],},
			{Content: "When modifying your car, make sure to research how different mods can impact your insurance. Performance mods like turbos and nitrous might raise your rates.", UserID: emailToID["demo2@gmail.com"], QuestionID: questionTitleToID["How do car modifications affect insurance?"],},
		}
		for _, answer := range answers {
			DB.FirstOrCreate(&answer, models.Answer{Content: answer.Content})
		}
	}


	func seedVotes() {
		var users []models.User
		DB.Find(&users)

		var questions []models.Question
		DB.Find(&questions)

		// Creating a map for user emails to user IDs
		emailToID := map[string]uint{}
		for _, user := range users {
			emailToID[user.Email] = user.ID
		}

		questionTitleToID := map[string]uint{}
		for _, question := range questions {
			questionTitleToID[question.Title] = question.ID
		}

		votes := []models.Vote{
			{UserID: emailToID["demo@gmail.com"], QuestionID: questionTitleToID["What are the benefits of electric cars?"]},
			{UserID: emailToID["demo2@gmail.com"], QuestionID: questionTitleToID["Best muscle cars for 2023"]},
			{UserID: emailToID["demo3@gmail.com"], QuestionID: questionTitleToID["How to upgrade a car's performance?"],},
			{UserID: emailToID["demo4@gmail.com"], QuestionID: questionTitleToID["What is self-driving tech?"],},
			{UserID: emailToID["demo5@gmail.com"], QuestionID: questionTitleToID["What makes a car a supercar?"],},
			{UserID: emailToID["demo1@gmail.com"], QuestionID: questionTitleToID["What are the best cars for off-roading?"],},
			{UserID: emailToID["demo2@gmail.com"], QuestionID: questionTitleToID["How do I fix a leaky car tire?"],},
			{UserID: emailToID["demo3@gmail.com"], QuestionID: questionTitleToID["What are the pros and cons of used cars?"],},
			{UserID: emailToID["demo4@gmail.com"], QuestionID: questionTitleToID["Is it worth getting a Ford Mustang?"],},
			{UserID: emailToID["demo5@gmail.com"], QuestionID: questionTitleToID["What’s the future of autonomous vehicles?"],},
			{UserID: emailToID["demo1@gmail.com"], QuestionID: questionTitleToID["How do I get into F1 racing?"],},
			{UserID: emailToID["demo2@gmail.com"], QuestionID: questionTitleToID["What makes a car a classic?"],},
			{UserID: emailToID["demo3@gmail.com"], QuestionID: questionTitleToID["How do car modifications affect insurance?"],},
			{UserID: emailToID["demo4@gmail.com"], QuestionID: questionTitleToID["What’s the best SUV for family road trips?"],},
			{UserID: emailToID["demo5@gmail.com"], QuestionID: questionTitleToID["Electric Cars vs Gas Cars"],},
			{UserID: emailToID["demo1@gmail.com"], QuestionID: questionTitleToID["Is off-roading safe for beginners?"],},
			{UserID: emailToID["demo2@gmail.com"], QuestionID: questionTitleToID["How can I make my car faster?"],},
			{UserID: emailToID["demo3@gmail.com"], QuestionID: questionTitleToID["How to get started with car restoration?"],},
			{UserID: emailToID["demo4@gmail.com"], QuestionID: questionTitleToID["What's the best car for snow driving?"],},
			{UserID: emailToID["demo@gmail.com"], QuestionID: questionTitleToID["Is electric car charging expensive?"],},
		}
		for _, vote := range votes {
			DB.FirstOrCreate(&vote, models.Vote{UserID: vote.UserID, QuestionID: vote.QuestionID})
		}
	}
