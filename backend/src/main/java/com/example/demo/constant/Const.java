package com.example.demo.constant;

public class Const {

    // 共通
    public static final int DELETE_FLG_FALSE = 0;
    public static final int DELETE_FLG_TRUE = 1;

    // ユーザー
    // public static final String DEFAULT_USER_NAME = "ユーザー様";

    // 写真
    public static final int PICTURE_CATEGORY_USER = 1;

    // エラー
    public static final String NOT_UID_MSG = "ログイン情報が取得できませんでした。ログインしなおしてください。";
    public static final String NOT_REGISTER_MSG = "ユーザー情報が見つかりません。ユーザー登録してください。";

    // コンストラクタはプライベートにして、インスタンス化を防ぐ
    private Const() {
	throw new UnsupportedOperationException("定数クラスはインスタンス化できません");
    }
}