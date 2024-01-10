package controllers

import (
	"strconv"
	"time"

	"github.com/gofiber/fiber/v2"
	"github.com/golang-jwt/jwt"
	"gitlab.com/AlbinoVejar/finanzas/backend/src/config"
	"gitlab.com/AlbinoVejar/finanzas/backend/src/models"
	"gitlab.com/AlbinoVejar/finanzas/backend/src/utils"
)

func Login(context *fiber.Ctx) error {
	var status int = fiber.StatusAccepted
	db := config.Connection()
	var user models.User
	var userDB models.User
	context.BodyParser(&user)
	errQuery := db.Raw("CALL login_user(?)", user.Email).Scan(&userDB).Error
	if errQuery != nil {
		return context.SendStatus(fiber.StatusNotFound)
	} else {
		result := utils.DecodedPass(user.Password, userDB.Password)
		if result {
			claims := jwt.NewWithClaims(jwt.SigningMethodHS256, jwt.MapClaims{
				"IdUser": strconv.Itoa(int(userDB.Id)),
				"exp":    time.Now().Add(time.Hour * 24).Unix(), //1 day
			})
			token, tokenErr := claims.SignedString([]byte(config.SECRET_KEY))
			if tokenErr == nil {
				return context.JSON(fiber.Map{
					"status": "OK",
					"data":   token,
				})
			}

			status = fiber.StatusOK
		} else {
			status = fiber.StatusUnauthorized
		}

	}
	return context.SendStatus(status)
}

func GetUser(context *fiber.Ctx) error {
	var status int = 404
	return context.SendStatus(status)
}

func CreateUser(context *fiber.Ctx) error {
	var status int = fiber.StatusOK
	db := config.Connection()
	var newUser models.User
	context.BodyParser(&newUser)
	passEncoded, err := utils.EncodedPass(newUser.Password)
	if err != nil {
		panic(err)
	}
	errQuery := db.Raw("CALL create_user(?,?,?)", newUser.Name, newUser.Email, passEncoded).Error
	if errQuery != nil {
		status = fiber.ErrNotAcceptable.Code
	}
	status = fiber.StatusOK
	return context.SendStatus(status)
}

func UpdateUser(context *fiber.Ctx) error {
	var status int = fiber.StatusOK
	db := config.Connection()
	var newUser models.User
	context.BodyParser(&newUser)
	passEncoded, err := utils.EncodedPass(newUser.Password)
	if err != nil {
		panic(err)
	}
	errQuery := db.Raw("CALL update_user(?,?,?)", newUser.Name, newUser.Email, passEncoded).Error
	if errQuery != nil {
		status = fiber.ErrNotAcceptable.Code
	}
	status = fiber.StatusOK
	return context.SendStatus(status)
}
