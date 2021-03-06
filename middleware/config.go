package middleware

import (
	"encoding/json"
	"io/ioutil"
)

var Config = &struct {
	App *struct {
		Bind    string `json:"bind"`
		WebRoot string `json:"webroot"`
		Env     string `json:"env"`
		NumDoc  int64  `json:"numdoc"`
	} `json:"app"`
	Upload *struct {
		Server string `json:"server"`
		Root   string `json:"root"`
	} `json:"upload"`
	Rethink *struct {
		Address   string `json:"address"`
		Database  string `json:"database"`
		MaxIdle   int    `json:"maxIdle"`
		MaxActive int    `json:"maxActive"`
	} `json:"rethink"`
	Redis map[string]*struct {
		Address string `json:"address"`
	} `json:"redis"`
}{}

func LoadConfig(file string) error {
	b, err := ioutil.ReadFile(file)
	if err != nil {
		return err
	}
	return json.Unmarshal(b, Config)
}
